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
  async add(@Param('userId') userId: string, @Body() body: { osposItemId: number; quantity: number }) {
    return this.cartService.addToCart(userId, Number(body.osposItemId), body.quantity);
  }

  @Delete(':userId/:osposItemId')
  async remove(@Param('userId') userId: string, @Param('osposItemId') osposItemId: string) {
    return this.cartService.removeFromCart(userId, Number(osposItemId));
  }
}
