import { Injectable, NotFoundException } from '@nestjs/common';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';
import { config } from '../../config';

/**
 * InventoryService now delegates all stock data to OSPOS.
 * The TileVista database no longer holds a Product table.
 * Stock levels, SKUs, and item names are authoritative in OSPOS.
 */
@Injectable()
export class InventoryService {
  constructor(
    private readonly osposService: OsposIntegrationService,
  ) {}

  /**
   * Returns all OSPOS items as inventory level entries.
   */
  async getInventoryLevels() {
    const items = await this.osposService.fetchAllItems();
    return items.map((item) => ({
      osposItemId: item.item_id,
      sku: item.sku,
      name: item.name,
      quantity: item.quantity,
      category: item.category,
      price: item.price,
    }));
  }

  /**
   * Returns OSPOS items whose quantity is at or below the configured low-stock threshold.
   */
  async getLowStockAlerts() {
    const items = await this.osposService.fetchAllItems();
    return items
      .filter((item) => item.quantity <= config.lowStockThreshold)
      .map((item) => ({
        osposItemId: item.item_id,
        sku: item.sku,
        name: item.name,
        quantity: item.quantity,
        category: item.category,
        price: item.price,
      }));
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
