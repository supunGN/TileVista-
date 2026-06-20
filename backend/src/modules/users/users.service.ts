import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  private mapUserResponse(user: any) {
    const { password_hash, ...result } = user;
    return {
      id: user.user_id,
      email: user.email,
      firstName: user.first_name,
      lastName: user.last_name,
      phone: user.phone,
      role: user.role ? user.role.toUpperCase() : 'CUSTOMER',
      status: user.status,
      createdAt: user.created_at,
      updatedAt: user.updated_at,
    };
  }

  async findOne(id: string) {
    const user = await this.prisma.users.findUnique({
      where: { user_id: id },
    });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    return this.mapUserResponse(user);
  }

  async findAll() {
    const dbUsers = await this.prisma.users.findMany();
    return dbUsers.map((user) => this.mapUserResponse(user));
  }
}
