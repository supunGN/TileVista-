import { Controller, Post, Get, Body, Headers, UnauthorizedException } from '@nestjs/common';
import { POSService } from './pos.service';
import { config } from '../../config';

@Controller('pos')
export class POSController {
  constructor(private posService: POSService) {}

  @Post('sync')
  async syncTransaction(
    @Headers('x-pos-signature') signature: string,
    @Body()
    body: {
      sku: string;
      quantity: number;
      action: 'SALE' | 'RESTOCK';
    }
  ) {
    // Simple mock signature check
    if (signature !== config.pos.webhookSecret) {
      throw new UnauthorizedException('Invalid POS Signature webhook payload');
    }

    return this.posService.syncPOSTransaction({
      sku: body.sku,
      quantitySynced: body.quantity,
      action: body.action,
    });
  }

  @Get('logs')
  async getLogs() {
    return this.posService.getSyncLogs();
  }
}
