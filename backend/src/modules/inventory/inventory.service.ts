import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { config } from '../../config';

@Injectable()
export class InventoryService {
  constructor(private prisma: PrismaService) {}

  async getInventoryLevels() {
    return this.prisma.product.findMany({
      select: {
        id: true,
        sku: true,
        name: true,
        quantity: true,
        category: true,
        brand: true,
      },
    });
  }

  async getLowStockAlerts() {
    return this.prisma.product.findMany({
      where: {
        quantity: {
          lte: config.lowStockThreshold,
        },
      },
      select: {
        id: true,
        sku: true,
        name: true,
        quantity: true,
        category: true,
      },
    });
  }

  async updateStock(sku: string, change: number) {
    const product = await this.prisma.product.findUnique({ where: { sku } });
    if (!product) {
      throw new NotFoundException(`Product SKU ${sku} not found`);
    }

    const newQuantity = Math.max(0, product.quantity + change);

    return this.prisma.product.update({
      where: { sku },
      data: { quantity: newQuantity },
    });
  }
}
