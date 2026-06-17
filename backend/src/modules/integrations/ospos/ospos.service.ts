import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IOsposRawStock, OsposStockResponseDto } from './dto/ospos-product.dto';

/**
 * Service to handle communications with the external OSPOS (Open Source Point Of Sale) API.
 * Safely fetches live stock inventory data and provides it to the core orders and analytics modules.
 */
@Injectable()
export class OsposIntegrationService {
  private readonly logger = new Logger(OsposIntegrationService.name);

  // Read OSPOS API configurations from environment variables or use the specified defaults
  private readonly baseUrl = process.env.OSPOS_API_BASE_URL || 'http://localhost/ospos/public/index.php/api/stock';
  private readonly deductUrl = process.env.OSPOS_API_DEDUCT_URL || 'http://localhost/ospos/public/index.php/api/deduct_stock';
  private readonly authToken = process.env.OSPOS_API_AUTH_TOKEN || 'Bearer your_secret_ospos_token_here';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Safe method to fetch live stock from OSPOS for a specific item ID.
   * 
   * @param itemId The numerical item ID
   * @returns A promise resolving to the available inventory quantity as a number
   */
  async fetchLiveStockFromPos(itemId: number): Promise<number> {
    const details = await this.fetchStockDetailsFromPos(itemId);
    return details.stock;
  }

  /**
   * Fetches the complete, normalized stock details (including low stock calculation) from OSPOS.
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
              'Authorization': this.authToken,
              'Accept': 'application/json',
            },
          },
        ),
      );

      if (!response || !response.data) {
        throw new Error('OSPOS API returned an empty or invalid response payload');
      }

      // Normalize raw high-precision string values to typed primitives using the DTO constructor
      const dto = new OsposStockResponseDto(response.data);

      this.logger.log(`Successfully fetched and normalized stock for item ${itemId}: ${dto.stock} (isLowStock: ${dto.isLowStock})`);
      return dto;

    } catch (error) {
      this.logger.error(
        `Failed to retrieve stock for item ID ${itemId} from OSPOS connection layer. Error: ${error.message}`,
        error.stack,
      );

      // Map any network, HTTP, or parser error to NestJS BAD_GATEWAY HttpException as required
      throw new HttpException(
        'Failed to connect to showroom inventory network layer',
        HttpStatus.BAD_GATEWAY,
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
              'Authorization': this.authToken,
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
        'Failed to connect to showroom inventory network layer for stock deduction',
        HttpStatus.BAD_GATEWAY,
      );
    }
  }
}
