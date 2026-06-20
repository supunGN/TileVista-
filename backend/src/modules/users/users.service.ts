import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private mapUser(user: any) {
    const { password_hash, ...result } = user;
    return {
      id: user.user_id,
      firstName: user.first_name,
      lastName: user.last_name,
      email: user.email,
      phone: user.phone,
      role: user.role.toUpperCase(),
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({ where: { user_id: id } });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return this.mapUser(user);
  }

  async findAll() {
    const usersList = await this.prisma.users.findMany();
    return usersList.map((u) => this.mapUser(u));
  }
}
