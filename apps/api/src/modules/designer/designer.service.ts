import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class DesignerService {
  constructor(private prisma: PrismaService) {}

  async saveLayout(userId: string | null, data: {
    name: string;
    shape: string;
    width: number;
    length: number;
    height: number;
    wallDesigns: any;
    placements: any;
  }) {
    return this.prisma.bathroomLayout.create({
      data: {
        userId,
        name: data.name,
        shape: data.shape,
        width: data.width,
        length: data.length,
        height: data.height,
        wallDesigns: data.wallDesigns,
        placements: data.placements,
      },
    });
  }

  async getLayout(id: string) {
    const layout = await this.prisma.bathroomLayout.findUnique({ where: { id } });
    if (!layout) {
      throw new NotFoundException(`Bathroom layout with ID ${id} not found`);
    }
    return layout;
  }

  async getCustomerLayouts(userId: string) {
    return this.prisma.bathroomLayout.findMany({
      where: { userId },
      orderBy: { updatedAt: 'desc' },
    });
  }
}
