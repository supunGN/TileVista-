import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IOsposRawStock, OsposStockResponseDto } from './dto/ospos-product.dto';

/**
 * Typed interface for a single OSPOS item returned by GET /api/items.
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
 * Service to handle communications with the external OSPOS (Open Source Point Of Sale) API.
 * Safely fetches live stock inventory data and provides it to the core orders and analytics modules.
 */
@Injectable()
export class OsposIntegrationService {
  private readonly logger = new Logger(OsposIntegrationService.name);

  // Read OSPOS API configurations from environment variables or use the specified defaults
  private readonly baseUrl = process.env.OSPOS_API_BASE_URL || 'http://localhost/ospos/public/index.php/api/stock';
  private readonly itemsUrl = process.env.OSPOS_API_ITEMS_URL || 'http://localhost/ospos/public/index.php/api/items';
  private readonly deductUrl = process.env.OSPOS_API_DEDUCT_URL || 'http://localhost/ospos/public/index.php/api/deduct_stock';
  private readonly secretToken = process.env.OSPOS_API_AUTH_TOKEN || 'Bearer your_secret_ospos_token_here';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Fetches all active items from OSPOS with their live quantities.
   * Returns an empty array and logs a warning if OSPOS is unreachable.
   */
  async fetchAllItems(): Promise<OsposItem[]> {
    try {
      this.logger.log('Fetching full item catalog from OSPOS...');
      const response = await firstValueFrom(
        this.httpService.get<OsposItem[]>(this.itemsUrl, {
          headers: {
            Authorization: this.secretToken,
            Accept: 'application/json',
          },
        }),
      );
      this.logger.log(`Received ${response.data.length} items from OSPOS.`);
      return response.data;
    } catch (error) {
      this.logger.error(`Failed to fetch item catalog from OSPOS: ${error.message}`);
      return [];
    }
  }


  /**
   * Safe method to fetch live stock from OSPOS for a specific item ID.
   * If OSPOS is offline, it returns a safe fallback stock level of 0 with isStaleData = true.
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
   * Fetches the complete, normalized stock details (including low stock calculation) from OSPOS.
   * Seamlessly catches and logs network or server disruptions and returns a fallback state.
   * 
   * @param itemId The numerical item ID
   * @returns A promise resolving to the OsposStockResponseDto
   */
  async fetchStockDetailsFromPos(itemId: number): Promise<OsposStockResponseDto> {
    try {
      this.logger.log(`Initiating live inventory request to OSPOS for item: ${itemId}`);
      
      const response = await firstValueFrom(
        this.httpService.get<IOsposRawStock>(
          this.baseUrl,
          {
            params: { item_id: itemId },
            headers: {
              'Authorization': this.secretToken,
              'Accept': 'application/json',
            },
          },
        ),
      );

      if (!response || !response.data) {
        throw new Error('OSPOS API returned an empty or invalid response payload');
      }

      // Normalize raw high-precision string values to typed primitives using the DTO constructor
      const dto = new OsposStockResponseDto(response.data, undefined, false);

      this.logger.log(`Successfully fetched and normalized stock for item ${itemId}: ${dto.stock} (isLowStock: ${dto.isLowStock})`);
      return dto;

    } catch (error) {
      // Catch network disruption, timeout, refusal, or internal server error seamlessly and log it
      this.logger.error(
        `OSPOS network disruption or integration failure for item ID ${itemId}. Returning fallback stock level. Error: ${error.message}`,
        error.stack,
      );

      // Return a safe fallback DTO with stock 0 and isStaleData = true
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
   * Decrements stock quantity for a specific item in OSPOS.
   * Invoked when an online web order transaction goes through.
   * 
   * @param itemId The numeric product item ID in OSPOS
   * @param quantity The quantity to deduct
   * @returns A promise resolving to true on successful deduction
   */
  async deductStockInPos(itemId: number, quantity: number): Promise<boolean> {
    try {
      this.logger.log(`Initiating stock deduction request in OSPOS for item: ${itemId}, quantity: ${quantity}`);
      
      const payload = {
        item_id: itemId,
        quantity_to_deduct: quantity,
      };

      const response = await firstValueFrom(
        this.httpService.post<{ success: boolean; new_stock: number }>(
          this.deductUrl,
          payload,
          {
            headers: {
              'Authorization': this.secretToken,
              'Content-Type': 'application/json',
              'Accept': 'application/json',
            },
          },
        ),
      );

      if (!response || !response.data) {
        throw new Error('OSPOS API returned an empty or invalid response payload during stock deduction');
      }

      const isSuccess = response.data.success === true;
      if (!isSuccess) {
        throw new Error(`OSPOS stock deduction reported failure: ${JSON.stringify(response.data)}`);
      }

      this.logger.log(`Successfully deducted ${quantity} units for item ${itemId}. New stock level: ${response.data.new_stock}`);
      return true;

    } catch (error) {
      this.logger.error(
        `Failed to deduct stock for item ID ${itemId} in OSPOS. Error: ${error.message}`,
        error.stack,
      );

      throw new HttpException(
        'Failed to process downstream inventory allocation mapping',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
