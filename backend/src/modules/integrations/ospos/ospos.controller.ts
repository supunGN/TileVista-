import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OsposIntegrationService } from './ospos.service';

/**
 * Controller exposing administrative endpoints for integration management and diagnostics.
 * Path: /admin/integrations/ospos
 */
@Controller('admin/integrations/ospos')
export class OsposIntegrationController {
  constructor(private readonly osposService: OsposIntegrationService) {}

  /**
   * Diagnostic GET endpoint to instantly test cross-system communication.
   * Path: GET /admin/integrations/ospos/test-sync/:itemId
   * 
   * @param itemId Unique identifier of the product item (parsed as integer)
   * @returns JSON payload mapping itemId to its current liveStock
   */
  @Get('test-sync/:itemId')
  async testSync(@Param('itemId', ParseIntPipe) itemId: number) {
    const result = await this.osposService.fetchLiveStockFromPos(itemId);
    return {
      itemId,
      liveStock: result.stock,
      isStaleData: result.isStaleData,
    };
  }
}
