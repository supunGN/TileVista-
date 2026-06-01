import { Controller, Get, Post, Delete, Body, Param } from '@nestjs/common';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @Get(':userId')
  async getCart(@Param('userId') userId: string) {
    return this.cartService.getCart(userId);
  }

  @Post(':userId')
  async add(@Param('userId') userId: string, @Body() body: { productId: string; quantity: number }) {
    return this.cartService.addToCart(userId, body.productId, body.quantity);
  }

  @Delete(':userId/:productId')
  async remove(@Param('userId') userId: string, @Param('productId') productId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }
}
