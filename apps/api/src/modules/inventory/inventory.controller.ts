import { Controller, Get, Body, Put, UseGuards } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('inventory')
@UseGuards(JwtAuthGuard)
export class InventoryController {
  constructor(private inventoryService: InventoryService) {}

  @Get()
  async getLevels() {
    return this.inventoryService.getInventoryLevels();
  }

  @Get('low-stock')
  async getAlerts() {
    return this.inventoryService.getLowStockAlerts();
  }

  @Put('stock')
  async adjustStock(@Body() body: { sku: string; change: number }) {
    return this.inventoryService.updateStock(body.sku, body.change);
  }
}
