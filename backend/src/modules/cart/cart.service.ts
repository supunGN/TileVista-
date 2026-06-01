import { Injectable, BadRequestException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class CartService {
  constructor(private prisma: PrismaService) {}

  // Mock in-memory user carts
  private userCarts = new Map<string, { productId: string; quantity: number }[]>();

  async getCart(userId: string) {
    const items = this.userCarts.get(userId) || [];
    const populated = [];

    for (const item of items) {
      const product = await this.prisma.product.findUnique({ where: { id: item.productId } });
      if (product) {
        populated.push({
          productId: item.productId,
          product,
          quantity: item.quantity,
        });
      }
    }
    return populated;
  }

  async addToCart(userId: string, productId: string, quantity: number) {
    const product = await this.prisma.product.findUnique({ where: { id: productId } });
    if (!product) {
      throw new BadRequestException('Product not found in catalogue');
    }
    if (product.quantity < quantity) {
      throw new BadRequestException('Insufficient stock quantity');
    }

    const current = this.userCarts.get(userId) || [];
    const index = current.findIndex((item) => item.productId === productId);
    if (index > -1) {
      current[index].quantity += quantity;
    } else {
      current.push({ productId, quantity });
    }

    this.userCarts.set(userId, current);
    return this.getCart(userId);
  }

  async removeFromCart(userId: string, productId: string) {
    const current = this.userCarts.get(userId) || [];
    const filtered = current.filter((item) => item.productId !== productId);
    this.userCarts.set(userId, filtered);
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    this.userCarts.set(userId, []);
  }
}
