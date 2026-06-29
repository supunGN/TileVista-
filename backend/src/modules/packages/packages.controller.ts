import { Controller, Get, Post, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';

@Controller('packages')
export class PackagesController {
  constructor(private packagesService: PackagesService) {}

  @Get()
  async getAll() {
    return this.packagesService.findAll(false);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin')
  async adminGetAll() {
    return this.packagesService.findAll(true);
  }

  @Get(':id')
  async getOne(@Param('id') id: string) {
    return this.packagesService.findOne(id, false);
  }

  @UseGuards(JwtAuthGuard)
  @Get('admin/:id')
  async adminGetOne(@Param('id') id: string) {
    return this.packagesService.findOne(id, true);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async create(
    @Body()
    body: {
      name: string;
      description?: string;
      discountPercent: number;
      osposItemIds: number[];
    }
  ) {
    return this.packagesService.create(body);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async remove(@Param('id') id: string) {
    return this.packagesService.remove(id);
  }
}
