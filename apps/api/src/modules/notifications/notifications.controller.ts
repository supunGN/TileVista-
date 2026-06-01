import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('notifications')
@UseGuards(JwtAuthGuard)
export class NotificationsController {
  constructor(private notificationsService: NotificationsService) {}

  @Post('trigger-low-stock')
  async triggerStockAlert(@Body() body: { sku: string; quantity: number }) {
    return this.notificationsService.sendLowStockAlert(body.sku, body.quantity);
  }
}
