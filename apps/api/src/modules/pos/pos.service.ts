import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class POSService {
  constructor(private prisma: PrismaService) {}

  async syncPOSTransaction(data: { sku: string; quantitySynced: number; action: 'SALE' | 'RESTOCK' }) {
    const product = await this.prisma.product.findUnique({
      where: { sku: data.sku },
    });

    if (!product) {
      // Log failure audit
      await this.prisma.pOSSyncLog.create({
        data: {
          sku: data.sku,
          quantitySynced: data.quantitySynced,
          action: data.action,
          status: 'FAILED',
          errorMessage: 'Product SKU does not exist in local catalogue',
        },
      });
      throw new NotFoundException(`Product SKU ${data.sku} not found`);
    }

    const modifier = data.action === 'SALE' ? -data.quantitySynced : data.quantitySynced;
    const finalQuantity = Math.max(0, product.quantity + modifier);

    // Update Product Stock
    await this.prisma.product.update({
      where: { sku: data.sku },
      data: { quantity: finalQuantity },
    });

    // Log success audit
    return this.prisma.pOSSyncLog.create({
      data: {
        sku: data.sku,
        quantitySynced: data.quantitySynced,
        action: data.action,
        status: 'SUCCESS',
      },
    });
  }

  async getSyncLogs() {
    return this.prisma.pOSSyncLog.findMany({
      orderBy: { timestamp: 'desc' },
      take: 50,
    });
  }
}
