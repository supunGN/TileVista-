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
   * Creates an online product purchase order.
   * Validates product names, pricing, and stock availability directly from OSPOS.
   */
  async createOrder(userId: string | null, data: {
    items: { osposItemId: number; quantity: number }[];
    shippingAddress?: string;
    paymentMethod?: string;
  }) {
    if (!data.items || data.items.length === 0) {
      throw new BadRequestException('Checkout cart cannot be empty');
    }

    // Resolve user_id: order requires a valid non-null user in the database
    let targetUserId = userId;
    if (!targetUserId) {
      const defaultUser = await this.prisma.users.findFirst();
      if (!defaultUser) {
        throw new NotFoundException('No active users found to associate with this order');
      }
      targetUserId = defaultUser.user_id;
    }

    // Fetch all OSPOS items to validate quantities and prices live
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposItemMap = new Map(allOsposItems.map((item) => [item.item_id, item]));

    return this.prisma.$transaction(async (tx) => {
      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of data.items) {
        const osposItem = osposItemMap.get(item.osposItemId);
        if (!osposItem) {
          throw new NotFoundException(`OSPOS Item ID ${item.osposItemId} not found`);
        }
        if (osposItem.quantity < item.quantity) {
          throw new BadRequestException(`Insufficient stock for product ${osposItem.name}`);
        }

        const subtotal = osposItem.price * item.quantity;
        totalAmount += subtotal;

        orderItemsData.push({
          order_item_id: crypto.randomUUID(),
          ospos_item_id: item.osposItemId,
          product_name_snapshot: osposItem.name,
          quantity: item.quantity,
          unit_price: osposItem.price,
          subtotal: subtotal,
        });
      }

      const orderId = crypto.randomUUID();
      const orderRef = `ORD-${Date.now()}`;

      return tx.orders.create({
        data: {
          order_id: orderId,
          order_reference: orderRef,
          user_id: targetUserId,
          total_amount: totalAmount,
          status: 'pending', // lowercase mysql enum
          payment_status: 'pending', // lowercase mysql enum
          approval_type: 'auto',
          order_items: {
            create: orderItemsData,
          },
        },
        include: {
          order_items: true,
        },
      });
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.orders.findUnique({
      where: { order_id: id },
      include: {
        order_items: true,
      },
    });
    if (!order) {
      throw new NotFoundException(`Order with ID ${id} not found`);
    }
    return order;
  }

  async getCustomerOrders(userId: string) {
    return this.prisma.orders.findMany({
      where: { user_id: userId },
      include: {
        order_items: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.orders.findMany({
      include: {
        order_items: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Approves a showroom order sitting in pending state,
   * performs a downstream inventory deduction inside OSPOS, and updates database records.
   */
  async approvePendingShowroomOrder(orderId: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      // 1. Fetch target order record
      const order = await tx.orders.findUnique({
        where: { order_id: orderId },
        include: {
          order_items: true,
        },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      // Check current status: must be exactly 'pending'
      if (order.status !== 'pending') {
        throw new BadRequestException('Order has already been processed or finalized');
      }

      try {
        // Deduct OSPOS stock for each item in the order
        for (const item of order.order_items) {
          const syncSuccess = await this.osposService.deductStockInPos(item.ospos_item_id, item.quantity);
          if (!syncSuccess) {
            throw new Error(`OSPOS stock deduction failed for item ID ${item.ospos_item_id}`);
          }
        }

        // 3. Prisma Transaction Closure - update local database status to 'approved'
        return await tx.orders.update({
          where: { order_id: order.order_id },
          data: {
            status: 'approved',
            confirmed_at: new Date(),
          },
          include: {
            order_items: true,
          },
        });
      } catch (error) {
        // Throwing propagates out of transaction, preventing local database state update
        throw new BadRequestException(`Downstream OSPOS synchronization failed: ${error.message}`);
      }
    });
  }
}
