import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';

@Injectable()
export class OrdersService {
  constructor(
    private prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  async createOrder(userId: string | null, data: {
    items: { productId: string; quantity: number }[];
    shippingAddress: string;
    paymentMethod: string;
  }) {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Checkout cart cannot be empty');
    }

    return this.prisma.$transaction(async (tx) => {
      let subtotal = 0;
      const orderItemsData = [];

      for (const item of data.items) {
        const product = await tx.product.findUnique({ where: { id: item.productId } });
        if (!product) {
          throw new NotFoundException(`Product ID ${item.productId} not found`);
        }
        if (product.quantity < item.quantity) {
          throw new BadRequestException(`Insufficient stock for product ${product.name}`);
        }

        // Deduct inventory stock
        await tx.product.update({
          where: { id: product.id },
          data: { quantity: product.quantity - item.quantity },
        });

        const discountedPrice = product.price * (1 - product.discount / 100);
        subtotal += discountedPrice * item.quantity;

        orderItemsData.push({
          productId: product.id,
          quantity: item.quantity,
          priceAtPurchase: discountedPrice,
        });
      }

      const taxRate = 0.15;
      const tax = subtotal * taxRate;
      const total = subtotal + tax;

      return tx.order.create({
        data: {
          userId,
          status: 'CONFIRMED',
          total,
          tax,
          discount: 0,
          shippingAddress: data.shippingAddress,
          paymentMethod: data.paymentMethod,
          items: {
            create: orderItemsData,
          },
        },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getCustomerOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: {
        items: {
          include: {
            product: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Approves a showroom order sitting in PENDING_SHOWROOM_CONFIRMATION state,
   * performs a downstream inventory deduction inside OSPOS, and updates database records.
   * 
   * @param orderId Unique target order identifier (mapped to string internally)
   * @returns Mapped Prisma update payload document
   */
  async approvePendingShowroomOrder(orderId: number): Promise<any> {
    // Wrap database query and external sync inside a safe transactional try/catch context block
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch target order record
      const order = await tx.order.findUnique({
        where: { id: String(orderId) },
        include: {
          items: {
            include: {
              product: true,
            },
          },
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // Check current status: must be exactly 'PENDING_SHOWROOM_CONFIRMATION'
      if (order.status !== 'PENDING_SHOWROOM_CONFIRMATION') {
        throw new BadRequestException('Order has already been processed or finalized');
      }

      if (order.osposItemId === null || order.quantity === null) {
        throw new BadRequestException('Order is missing OSPOS item ID or quantity metadata');
      }

      try {
        // 2. Outbound sync to OSPOS service layer
        const syncSuccess = await this.osposService.deductStockInPos(order.osposItemId, order.quantity);

        if (!syncSuccess) {
          throw new Error('OSPOS stock deduction failed to return success confirmation');
        }

        // 3. Prisma Transaction Closure
        return await tx.order.update({
          where: { id: order.id },
          data: {
            status: 'ACCEPTED_AND_SYNCED',
            synchronizedAt: new Date(),
          },
          include: {
            items: {
              include: {
                product: true,
              },
            },
          },
        });
      } catch (error) {
        // Throwing propagates out of transaction, preventing local database state update
        throw new BadRequestException(`Downstream OSPOS synchronization failed: ${error.message}`);
      }
    });
  }
}
