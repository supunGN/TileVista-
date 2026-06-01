import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class AnalyticsService {
  constructor(private prisma: PrismaService) {}

  async getAdminDashboardStats() {
    const salesAggregate = await this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { id: true },
    });

    const totalRevenue = salesAggregate._sum.total || 0;
    const totalOrders = salesAggregate._count.id || 0;

    const orderItems = await this.prisma.orderItem.groupBy({
      by: ['productId'],
      _sum: { quantity: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    const fastMovingItems = [];
    for (const item of orderItems) {
      const product = await this.prisma.product.findUnique({
        where: { id: item.productId },
      });
      if (product) {
        fastMovingItems.push({
          productId: product.id,
          productName: product.name,
          sku: product.sku,
          category: product.category,
          unitsSold: item._sum.quantity || 0,
          revenue: (item._sum.quantity || 0) * product.price,
          currentStock: product.quantity,
        });
      }
    }

    const restockAlertsCount = await this.prisma.product.count({
      where: { quantity: { lte: 10 } },
    });

    const orders = await this.prisma.order.findMany({
      select: { createdAt: true, total: true },
      orderBy: { createdAt: 'asc' },
    });

    const salesTrendMap = new Map<string, { revenue: number; orderCount: number }>();
    orders.forEach((o) => {
      const dateStr = o.createdAt.toISOString().split('T')[0];
      const existing = salesTrendMap.get(dateStr) || { revenue: 0, orderCount: 0 };
      salesTrendMap.set(dateStr, {
        revenue: existing.revenue + o.total,
        orderCount: existing.orderCount + 1,
      });
    });

    const salesTrends = Array.from(salesTrendMap.entries()).map(([date, data]) => ({
      date,
      revenue: Number(data.revenue.toFixed(2)),
      orderCount: data.orderCount,
    }));

    return {
      totalRevenue: Number(totalRevenue.toFixed(2)),
      totalOrders,
      fastMovingItems,
      slowMovingItems: [],
      salesTrends,
      restockAlertsCount,
    };
  }
}
