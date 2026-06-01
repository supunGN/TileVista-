import { Controller, Post, Get, Body, Param } from '@nestjs/common';
import { DesignerService } from './designer.service';

@Controller('designer')
export class DesignerController {
  constructor(private designerService: DesignerService) {}

  @Post('layout')
  async saveLayout(
    @Body()
    body: {
      userId?: string;
      name: string;
      shape: string;
      width: number;
      length: number;
      height: number;
      wallDesigns: any;
      placements: any;
    }
  ) {
    return this.designerService.saveLayout(body.userId || null, body);
  }

  @Get('customer/:userId')
  async getCustomerLayouts(@Param('userId') userId: string) {
    return this.designerService.getCustomerLayouts(userId);
  }

  @Get('layout/:id')
  async getLayout(@Param('id') id: string) {
    return this.designerService.getLayout(id);
  }
}
