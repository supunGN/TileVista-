import { Controller, Post, Get, Body, Param, Req, UseGuards } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @Post('checkout')
  async checkout(
    @Body()
    body: {
      userId?: string;
      items: { productId: string; quantity: number }[];
      shippingAddress: string;
      paymentMethod: string;
    }
  ) {
    return this.ordersService.createOrder(body.userId || null, body);
  }

  @Get('customer/:userId')
  @UseGuards(JwtAuthGuard)
  async getCustomerOrders(@Param('userId') userId: string) {
    return this.ordersService.getCustomerOrders(userId);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.ordersService.getOrder(id);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getAll() {
    return this.ordersService.getAllOrders();
  }
}
