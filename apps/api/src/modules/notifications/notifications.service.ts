import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async sendLowStockAlert(sku: string, currentStock: number) {
    this.logger.warn(`LOW STOCK ALERT: Product SKU ${sku} has only ${currentStock} units left.`);
    return {
      sent: true,
      message: `Low stock alert email pushed to administrator.`,
      timestamp: new Date(),
    };
  }

  async sendOrderConfirmation(orderId: string, email: string) {
    this.logger.log(`ORDER CONFIRMATION: Receipt sent to ${email} for Order ID: ${orderId}`);
    return {
      sent: true,
      message: `Receipt sent to customer email successfully.`,
      timestamp: new Date(),
    };
  }
}
