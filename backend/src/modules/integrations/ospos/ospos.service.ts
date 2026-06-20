import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { PrismaService } from '../../../prisma/prisma.service';
import { IOsposRawStock, OsposStockResponseDto } from './dto/ospos-product.dto';

/**
 * Typed interface for a single OSPOS item returned by the database.
 */
export interface OsposItem {
  item_id: number;
  name: string;
  category: string;
  sku: string;
  description: string;
  price: number;
  quantity: number;
}

/**
 * Service to handle communications with the external OSPOS (Open Source Point Of Sale) system.
 * Directly queries the local 'ospos' database to fetch live stock level metrics.
 */
@Injectable()
export class OsposIntegrationService {
  private readonly logger = new Logger(OsposIntegrationService.name);

  constructor(
    private readonly httpService: HttpService,
    private readonly prisma: PrismaService,
  ) {}

  /**
   * Fetches all active items from OSPOS database with their live quantities.
   * Returns an empty array and logs a warning if OSPOS database is unreachable.
   */
  async fetchAllItems(): Promise<OsposItem[]> {
    try {
      this.logger.log('Fetching full item catalog from OSPOS database directly...');
      const rows: any[] = await this.prisma.$queryRawUnsafe(`
        SELECT 
          i.item_id, 
          i.name, 
          i.category, 
          i.item_number, 
          i.description, 
          i.unit_price, 
          COALESCE(iq.quantity, 0) AS quantity 
        FROM ospos.ospos_items i
        LEFT JOIN ospos.ospos_item_quantities iq 
          ON i.item_id = iq.item_id AND iq.location_id = 1
        WHERE i.deleted = 0
        ORDER BY i.item_id ASC
      `);
      return rows.map(row => ({
        item_id: Number(row.item_id),
        name: row.name,
        category: row.category ?? '',
        sku: row.item_number ?? '',
        description: row.description ?? '',
        price: Number(row.unit_price),
        quantity: Number(row.quantity),
      }));
    } catch (error) {
      this.logger.error(`Failed to fetch item catalog from OSPOS database: ${error.message}`);
      return [];
    }
  }

  /**
   * Safe method to fetch live stock from OSPOS database for a specific item ID.
   * 
   * @param itemId The numerical item ID
   * @returns A promise resolving to an object containing stock level and stale flag
   */
  async fetchLiveStockFromPos(itemId: number): Promise<{ stock: number; isStaleData: boolean }> {
    const details = await this.fetchStockDetailsFromPos(itemId);
    return {
      stock: details.stock,
      isStaleData: details.isStaleData,
    };
  }

  /**
   * Fetches the complete, normalized stock details (including low stock calculation) from OSPOS database.
   * 
   * @param itemId The numerical item ID
   * @returns A promise resolving to the OsposStockResponseDto
   */
  async fetchStockDetailsFromPos(itemId: number): Promise<OsposStockResponseDto> {
    try {
      this.logger.log(`Initiating live inventory request to OSPOS database for item: ${itemId}`);
      const rows: any[] = await this.prisma.$queryRawUnsafe(`
        SELECT 
          item_id, 
          COALESCE(quantity, 0) AS quantity_available 
        FROM ospos.ospos_item_quantities 
        WHERE item_id = ${itemId} AND location_id = 1
        LIMIT 1
      `);

      if (rows.length === 0) {
        throw new Error(`Item ${itemId} not found in ospos database quantities`);
      }

      const rawStock: IOsposRawStock = {
        item_id: Number(rows[0].item_id),
        quantity_available: Number(rows[0].quantity_available),
      };

      const dto = new OsposStockResponseDto(rawStock, undefined, false);
      this.logger.log(`Successfully fetched stock for item ${itemId}: ${dto.stock}`);
      return dto;
    } catch (error) {
      this.logger.error(
        `OSPOS database query failure for item ID ${itemId}. Returning fallback stock level. Error: ${error.message}`,
        error.stack,
      );

      return new OsposStockResponseDto(
        {
          item_id: itemId,
          quantity_available: 0,
        },
        undefined,
        true, // isStaleData: true
      );
    }
  }

  /**
   * Decrements stock quantity for a specific item in OSPOS database.
   * 
   * @param itemId The numeric product item ID in OSPOS
   * @param quantity The quantity to deduct
   * @returns A promise resolving to true on successful deduction
   */
  async deductStockInPos(itemId: number, quantity: number): Promise<boolean> {
    try {
      this.logger.log(`Initiating direct database stock deduction in OSPOS for item: ${itemId}, quantity: ${quantity}`);
      
      // Perform database update
      await this.prisma.$executeRawUnsafe(`
        UPDATE ospos.ospos_item_quantities 
        SET quantity = quantity - ${quantity} 
        WHERE item_id = ${itemId} AND location_id = 1
      `);

      // Log to ospos_inventory tracking table
      const formattedDate = new Date().toISOString().slice(0, 19).replace('T', ' ');
      await this.prisma.$executeRawUnsafe(`
        INSERT INTO ospos.ospos_inventory 
          (trans_items, trans_user, trans_comment, trans_inventory, trans_location, trans_date) 
        VALUES 
          (${itemId}, 1, 'Deducted via TileVista Web Portal Order Sync', -${quantity}, 1, '${formattedDate}')
      `);

      this.logger.log(`Successfully deducted stock in OSPOS database for item ${itemId}`);
      return true;
    } catch (error) {
      this.logger.error(
        `Failed to deduct stock for item ID ${itemId} in OSPOS database. Error: ${error.message}`,
        error.stack,
      );

      throw new HttpException(
        'Failed to process downstream inventory allocation mapping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
