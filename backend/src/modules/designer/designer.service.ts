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
    // Resolve user_id: if null, fallback to the first active user in the database
    let targetUserId = userId;
    if (!targetUserId) {
      const firstUser = await this.prisma.users.findFirst();
      targetUserId = firstUser ? firstUser.user_id : '';
    }

    const design = await this.prisma.room_designs.create({
      data: {
        design_id: crypto.randomUUID(),
        user_id: targetUserId,
        design_name: data.name,
        room_shape: data.shape,
        width: data.width,
        length: data.length,
        height: data.height,
        design_type: 'bathroom',
      },
    });

    return {
      id: design.design_id,
      userId: design.user_id,
      name: design.design_name,
      shape: design.room_shape,
      width: Number(design.width),
      length: Number(design.length),
      height: Number(design.height),
      wallDesigns: data.wallDesigns || [],
      placements: data.placements || [],
    };
  }

  async getLayout(id: string) {
    const layout = await this.prisma.room_designs.findUnique({
      where: { design_id: id },
    });
    if (!layout) {
      throw new NotFoundException(`Bathroom layout with ID ${id} not found`);
    }
    return {
      id: layout.design_id,
      userId: layout.user_id,
      name: layout.design_name,
      shape: layout.room_shape,
      width: Number(layout.width),
      length: Number(layout.length),
      height: Number(layout.height),
      wallDesigns: [],
      placements: [],
    };
  }

  async getCustomerLayouts(userId: string) {
    const designs = await this.prisma.room_designs.findMany({
      where: { user_id: userId },
      orderBy: { updated_at: 'desc' },
    });
    return designs.map((layout) => ({
      id: layout.design_id,
      userId: layout.user_id,
      name: layout.design_name,
      shape: layout.room_shape,
      width: Number(layout.width),
      length: Number(layout.length),
      height: Number(layout.height),
      wallDesigns: [],
      placements: [],
    }));
  }
}
