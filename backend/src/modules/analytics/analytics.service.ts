import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';
import { config } from '../../config';

@Injectable()
export class AnalyticsService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  async getAdminDashboardStats() {
    const salesAggregate = await this.prisma.order.aggregate({
      _sum: { total: true },
      _count: { id: true },
    });

    const totalRevenue = salesAggregate._sum.total || 0;
    const totalOrders = salesAggregate._count.id || 0;

    // Group order items by OSPOS item_id to find fast-moving items
    const orderItems = await this.prisma.orderItem.groupBy({
      by: ['osposItemId'],
      _sum: { quantity: true, priceAtPurchase: true },
      orderBy: { _sum: { quantity: 'desc' } },
      take: 5,
    });

    // Fetch OSPOS live items once for metadata lookups
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposItemMap = new Map(allOsposItems.map((i) => [i.item_id, i]));

    const fastMovingItems = orderItems
      .map((item) => {
        const osposItem = osposItemMap.get(item.osposItemId);
        if (!osposItem) return null;
        return {
          osposItemId: item.osposItemId,
          itemName: osposItem.name,
          sku: osposItem.sku,
          category: osposItem.category,
          unitsSold: item._sum.quantity || 0,
          revenue: Number((item._sum.priceAtPurchase || 0).toFixed(2)),
          currentStock: osposItem.quantity,
        };
      })
      .filter(Boolean);

    // Low stock alerts come from OSPOS live quantities
    const restockAlertsCount = allOsposItems.filter(
      (i) => i.quantity <= config.lowStockThreshold,
    ).length;

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
