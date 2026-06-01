import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class OrdersService {
  constructor(private prisma: PrismaService) {}

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
}
