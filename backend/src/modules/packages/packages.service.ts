import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PackagesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    return this.prisma.productPackage.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
  }

  async findOne(id: string) {
    const pkg = await this.prisma.productPackage.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return pkg;
  }

  async create(data: { name: string; description?: string; discountPercent: number; productIds: string[] }) {
    const products = await this.prisma.product.findMany({
      where: { id: { in: data.productIds } },
    });

    const basePriceSum = products.reduce((sum, p) => sum + p.price, 0);
    const discountedPrice = basePriceSum * (1 - data.discountPercent / 100);

    const pkg = await this.prisma.productPackage.create({
      data: {
        name: data.name,
        description: data.description,
        discountPercent: data.discountPercent,
        price: discountedPrice,
      },
    });

    await this.prisma.packageProduct.createMany({
      data: data.productIds.map((pId) => ({
        packageId: pkg.id,
        productId: pId,
      })),
    });

    return this.findOne(pkg.id);
  }

  async remove(id: string) {
    const pkg = await this.findOne(id);
    return this.prisma.productPackage.delete({ where: { id: pkg.id } });
  }
}
