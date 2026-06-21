import { Injectable, NotFoundException } from '@nestjs/common';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';
import { PrismaService } from '../../prisma/prisma.service';
import { config } from '../../config';

/**
 * InventoryService now delegates all stock data to OSPOS.
 * The TileVista database no longer holds a Product table.
 * Stock levels, SKUs, and item names are authoritative in OSPOS.
 * Effective available quantity is calculated by subtracting active reservations.
 */
@Injectable()
export class InventoryService {
  constructor(
    private readonly osposService: OsposIntegrationService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Returns all OSPOS items as inventory level entries, adjusted by active reservations.
   */
  async getInventoryLevels() {
    const items = await this.osposService.fetchAllItems();

    // Fetch all active reservations that haven't expired
    const activeReservations = await this.prisma.inventory_reservations.findMany({
      where: {
        status: 'active',
        expires_at: { gte: new Date() },
      },
    });

    // Group active reservations by ospos_item_id
    const reservedQuantities = new Map<number, number>();
    for (const res of activeReservations) {
      reservedQuantities.set(
        res.ospos_item_id,
        (reservedQuantities.get(res.ospos_item_id) || 0) + res.quantity
      );
    }

    return items.map((item) => {
      const reservedQty = reservedQuantities.get(item.item_id) || 0;
      const quantityAvailable = Math.max(0, item.quantity - reservedQty);
      return {
        osposItemId: item.item_id,
        sku: item.sku,
        name: item.name,
        quantity: quantityAvailable, // Return effective stock
        category: item.category,
        price: item.price,
      };
    });
  }

  /**
   * Returns OSPOS items whose effective quantity is at or below the configured low-stock threshold.
   */
  async getLowStockAlerts() {
    const items = await this.osposService.fetchAllItems();

    // Fetch all active reservations that haven't expired
    const activeReservations = await this.prisma.inventory_reservations.findMany({
      where: {
        status: 'active',
        expires_at: { gte: new Date() },
      },
    });

    // Group active reservations by ospos_item_id
    const reservedQuantities = new Map<number, number>();
    for (const res of activeReservations) {
      reservedQuantities.set(
        res.ospos_item_id,
        (reservedQuantities.get(res.ospos_item_id) || 0) + res.quantity
      );
    }

    return items
      .map((item) => {
        const reservedQty = reservedQuantities.get(item.item_id) || 0;
        const quantityAvailable = Math.max(0, item.quantity - reservedQty);
        return {
          osposItemId: item.item_id,
          sku: item.sku,
          name: item.name,
          quantity: quantityAvailable,
          category: item.category,
          price: item.price,
        };
      })
      .filter((item) => item.quantity <= config.lowStockThreshold);
  }

  /**
   * NOTE: Stock updates are now handled exclusively by OSPOS cashier interface.
   * This method is kept as a no-op stub to avoid breaking any callers.
   */
  async updateStock(osposItemId: number, change: number) {
    throw new NotFoundException(
      `Stock updates are managed via OSPOS. Item ${osposItemId} stock cannot be modified from TileVista.`,
    );
  }
}
