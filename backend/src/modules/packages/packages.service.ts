import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';

@Injectable()
export class PackagesService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  /**
   * Enriches a package's item list with live OSPOS data.
   */
  private async enrichPackage(pkg: {
    id: string;
    name: string;
    description: string | null;
    discountPercent: number;
    price: number;
    imageUrl: string | null;
    createdAt: Date;
    updatedAt: Date;
    items: { osposItemId: number }[];
  }) {
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposMap = new Map(allOsposItems.map((i) => [i.item_id, i]));

    const enrichedItems = pkg.items.map(({ osposItemId }) => ({
      osposItemId,
      item: osposMap.get(osposItemId) ?? null,
    }));

    // Recalculate package price from live OSPOS prices
    const basePrice = enrichedItems.reduce(
      (sum, { item }) => sum + (item?.price ?? 0),
      0,
    );
    const calculatedPrice = basePrice * (1 - pkg.discountPercent / 100);

    return {
      ...pkg,
      items: enrichedItems,
      calculatedPrice: Number(calculatedPrice.toFixed(2)),
    };
  }

  async findAll() {
    const packages = await this.prisma.productPackage.findMany({
      include: { items: true },
    });
    return Promise.all(packages.map((pkg) => this.enrichPackage(pkg)));
  }

  async findOne(id: string) {
    const pkg = await this.prisma.productPackage.findUnique({
      where: { id },
      include: { items: true },
    });
    if (!pkg) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    return this.enrichPackage(pkg);
  }

  async create(data: {
    name: string;
    description?: string;
    discountPercent: number;
    osposItemIds: number[];
  }) {
    // Fetch live prices from OSPOS to calculate the package price
    const allItems = await this.osposService.fetchAllItems();
    const osposMap = new Map(allItems.map((i) => [i.item_id, i]));

    const basePrice = data.osposItemIds.reduce(
      (sum, id) => sum + (osposMap.get(id)?.price ?? 0),
      0,
    );
    const discountedPrice = basePrice * (1 - data.discountPercent / 100);

    const pkg = await this.prisma.productPackage.create({
      data: {
        name: data.name,
        description: data.description,
        discountPercent: data.discountPercent,
        price: discountedPrice,
      },
    });

    await this.prisma.packageItem.createMany({
      data: data.osposItemIds.map((osposItemId) => ({
        packageId: pkg.id,
        osposItemId,
      })),
    });

    return this.findOne(pkg.id);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.productPackage.delete({ where: { id } });
  }
}
