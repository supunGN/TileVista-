import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';

@Injectable()
export class OrdersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  /**
   * Creates a new order using OSPOS items.
   * Items are identified by osposItemId (integer) and validated against live OSPOS stock.
   */
  async createOrder(
    userId: string | null,
    data: {
      items: { osposItemId: number; quantity: number }[];
      shippingAddress: string;
      paymentMethod: string;
    },
  ) {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Checkout cart cannot be empty');
    }

    // Fetch live OSPOS data once to validate all items
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposMap = new Map(allOsposItems.map((i) => [i.item_id, i]));

    let subtotal = 0;
    const orderItemsData: {
      osposItemId: number;
      itemName: string;
      quantity: number;
      priceAtPurchase: number;
    }[] = [];

    for (const item of data.items) {
      const osposItem = osposMap.get(item.osposItemId);
      if (!osposItem) {
        throw new NotFoundException(`OSPOS item ID ${item.osposItemId} not found`);
      }
      if (osposItem.quantity < item.quantity) {
        throw new BadRequestException(
          `Insufficient stock for "${osposItem.name}". Available: ${osposItem.quantity}.`,
        );
      }

      subtotal += osposItem.price * item.quantity;
      orderItemsData.push({
        osposItemId: osposItem.item_id,
        itemName: osposItem.name, // snapshot of name at purchase time
        quantity: item.quantity,
        priceAtPurchase: osposItem.price,
      });
    }

    const taxRate = 0.15;
    const tax = subtotal * taxRate;
    const total = subtotal + tax;

    return this.prisma.order.create({
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
      include: { items: true },
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.order.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getCustomerOrders(userId: string) {
    return this.prisma.order.findMany({
      where: { userId },
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.order.findMany({
      include: { items: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  /**
   * Approves a showroom order, performs downstream OSPOS inventory deduction,
   * and marks the order as synchronized.
   */
  async approvePendingShowroomOrder(orderId: number): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.order.findUnique({
        where: { id: String(orderId) },
        include: { items: true },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status !== 'PENDING_SHOWROOM_CONFIRMATION') {
        throw new BadRequestException('Order has already been processed or finalized');
      }

      try {
        // Deduct stock in OSPOS for each line item
        for (const item of order.items) {
          const syncSuccess = await this.osposService.deductStockInPos(
            item.osposItemId,
            item.quantity,
          );
          if (!syncSuccess) {
            throw new Error(
              `OSPOS stock deduction failed for item ${item.osposItemId}`,
            );
          }
        }

        return await tx.order.update({
          where: { id: order.id },
          data: {
            status: 'ACCEPTED_AND_SYNCED',
            synchronizedAt: new Date(),
          },
          include: { items: true },
        });
      } catch (error) {
        throw new BadRequestException(
          `Downstream OSPOS synchronization failed: ${error.message}`,
        );
      }
    });
  }
}
