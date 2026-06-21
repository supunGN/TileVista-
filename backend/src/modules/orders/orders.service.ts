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
   * Incorporates active reservations to check effective available stock.
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
      // Fetch active reservations for the items being ordered
      const itemIds = data.items.map((i) => i.osposItemId);
      const activeReservations = await tx.inventory_reservations.findMany({
        where: {
          ospos_item_id: { in: itemIds },
          status: 'active',
          expires_at: { gte: new Date() },
        },
      });

      // Group active reservations by item ID
      const reservedQuantities = new Map<number, number>();
      for (const res of activeReservations) {
        reservedQuantities.set(
          res.ospos_item_id,
          (reservedQuantities.get(res.ospos_item_id) || 0) + res.quantity
        );
      }

      let totalAmount = 0;
      const orderItemsData = [];

      for (const item of data.items) {
        const osposItem = osposItemMap.get(item.osposItemId);
        if (!osposItem) {
          throw new NotFoundException(`OSPOS Item ID ${item.osposItemId} not found`);
        }

        const reservedQty = reservedQuantities.get(item.osposItemId) || 0;
        const effectiveStock = osposItem.quantity - reservedQty;
        if (effectiveStock < item.quantity) {
          throw new BadRequestException(
            `Insufficient stock for product ${osposItem.name} (OSPOS stock: ${osposItem.quantity}, reserved: ${reservedQty}, requested: ${item.quantity})`
          );
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

      const reservationTtlHours = Number(process.env.RESERVATION_TTL_HOURS) || 24;
      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + reservationTtlHours);

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
          inventory_reservations: {
            create: orderItemsData.map((item) => ({
              reservation_id: crypto.randomUUID(),
              ospos_item_id: item.ospos_item_id,
              quantity: item.quantity,
              expires_at: expiresAt,
              status: 'active',
            })),
          },
        },
        include: {
          order_items: true,
          inventory_reservations: true,
        },
      });
    });
  }

  async getOrder(id: string) {
    const order = await this.prisma.orders.findUnique({
      where: { order_id: id },
      include: {
        order_items: true,
        inventory_reservations: true,
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
        inventory_reservations: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  async getAllOrders() {
    return this.prisma.orders.findMany({
      include: {
        order_items: true,
        inventory_reservations: true,
      },
      orderBy: { created_at: 'desc' },
    });
  }

  /**
   * Approves a showroom order sitting in pending state,
   * releases reservations by marking them as 'completed', and updates status.
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

      // Update associated active reservations to 'completed'
      await tx.inventory_reservations.updateMany({
        where: { order_id: orderId, status: 'active' },
        data: { status: 'completed' },
      });

      // Update local database status to 'approved'
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
    });
  }

  /**
   * Cancels a showroom order, releasing any active stock reservations.
   */
  async cancelOrder(orderId: string): Promise<any> {
    return this.prisma.$transaction(async (tx) => {
      const order = await tx.orders.findUnique({
        where: { order_id: orderId },
      });

      if (!order) {
        throw new NotFoundException(`Order with ID ${orderId} not found`);
      }

      if (order.status === 'cancelled') {
        throw new BadRequestException('Order is already cancelled');
      }

      // Update associated active reservations to 'expired' (released)
      await tx.inventory_reservations.updateMany({
        where: { order_id: orderId, status: 'active' },
        data: { status: 'expired' },
      });

      return await tx.orders.update({
        where: { order_id: orderId },
        data: {
          status: 'cancelled',
        },
      });
    });
  }
}
