import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({ where: { id } });
    if (!user) {
      throw new NotFoundException('User profile not found');
    }
    const { passwordHash, ...result } = user;
    return result;
  }

  async findAll() {
    const users = await this.prisma.user.findMany();
    return users.map(({ passwordHash, ...u }) => u);
  }
}
