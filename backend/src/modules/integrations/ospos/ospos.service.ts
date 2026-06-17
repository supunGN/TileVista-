import { Injectable, HttpException, HttpStatus, Logger } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

/**
 * Service to handle communications with the external OSPOS (Open Source Point Of Sale) API.
 * Safely fetches live stock inventory data and provides it to the core orders and analytics modules.
 */
@Injectable()
export class OsposIntegrationService {
  private readonly logger = new Logger(OsposIntegrationService.name);

  // Read OSPOS API configurations from environment variables or use the specified defaults
  private readonly baseUrl = process.env.OSPOS_API_BASE_URL || 'http://localhost/ospos/public/index.php/api/stock';
  private readonly authToken = process.env.OSPOS_API_AUTH_TOKEN || 'Bearer your_secret_ospos_token_here';

  constructor(private readonly httpService: HttpService) {}

  /**
   * Safe method to fetch live stock from OSPOS for a specific item ID.
   * 
   * @param itemId The numerical item ID
   * @returns A promise resolving to the available inventory quantity as a number
   */
  async fetchLiveStockFromPos(itemId: number): Promise<number> {
    try {
      this.logger.log(`Initiating live inventory request to OSPOS for item: ${itemId}`);
      
      const response = await firstValueFrom(
        this.httpService.get<{ item_id: number; quantity_available: number }>(
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

      const { quantity_available } = response.data;

      if (quantity_available === undefined || quantity_available === null) {
        throw new Error(`The property 'quantity_available' is missing in OSPOS response structure`);
      }

      this.logger.log(`Successfully fetched stock for item ${itemId}: ${quantity_available}`);
      return Number(quantity_available);

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
}
