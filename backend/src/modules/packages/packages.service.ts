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
  private async enrichPackage(pkg: any) {
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposMap = new Map(allOsposItems.map((i) => [i.item_id, i]));

    let hasUnavailableItem = false;

    const enrichedItems = pkg.package_items.map((pi: any) => {
      const osposItem = osposMap.get(pi.products.ospos_item_id) ?? null;
      const hasAssetEntry = !!pi.products.product_assets;
      const isVisible = pi.products.product_assets?.is_visible ?? pi.products.is_active ?? true;
      
      if (!osposItem || !hasAssetEntry || !isVisible) {
        hasUnavailableItem = true;
      }

      return {
        osposItemId: pi.products.ospos_item_id,
        item: osposItem,
        quantity: pi.quantity,
      };
    });

    const basePrice = enrichedItems.reduce(
      (sum: number, { item, quantity }: any) => sum + (item?.price ?? 0) * quantity,
      0,
    );
    const calculatedPrice = basePrice * (1 - Number(pkg.discount_percentage) / 100);

    return {
      id: pkg.package_id,
      name: pkg.package_name,
      description: pkg.description,
      imageUrl: pkg.cover_image,
      discountPercent: Number(pkg.discount_percentage),
      items: enrichedItems,
      calculatedPrice: Number(calculatedPrice.toFixed(2)),
      createdAt: pkg.created_at,
      status: pkg.status,
      hasUnavailableItem,
    };
  }

  async findAll(includeHidden: boolean = false) {
    const packages = await this.prisma.packages.findMany({
      where: includeHidden ? undefined : { status: 'active' },
      include: {
        package_items: {
          include: {
            products: {
              include: {
                product_assets: true
              }
            },
          },
        },
      },
    });
    const enriched = await Promise.all(packages.map((pkg) => this.enrichPackage(pkg)));
    
    if (!includeHidden) {
      return enriched.filter(pkg => !pkg.hasUnavailableItem);
    }
    return enriched;
  }

  async findOne(id: string, includeHidden: boolean = false) {
    const pkg = await this.prisma.packages.findUnique({
      where: { package_id: id },
      include: {
        package_items: {
          include: {
            products: {
              include: {
                product_assets: true
              }
            }
          },
        },
      },
    });
    if (!pkg || (!includeHidden && pkg.status !== 'active')) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    
    const enriched = await this.enrichPackage(pkg);
    if (!includeHidden && enriched.hasUnavailableItem) {
      throw new NotFoundException(`Package with ID ${id} not found`);
    }
    
    return enriched;
  }

  async create(data: {
    name: string;
    description?: string;
    discountPercent: number;
    osposItemIds: number[];
  }) {
    const allItems = await this.osposService.fetchAllItems();
    const osposMap = new Map(allItems.map((i) => [i.item_id, i]));

    const basePrice = data.osposItemIds.reduce(
      (sum, id) => sum + (osposMap.get(id)?.price ?? 0),
      0,
    );
    const discountedPrice = basePrice * (1 - data.discountPercent / 100);

    const packageId = crypto.randomUUID();

    const packageItemsData = [];
    for (const osposItemId of data.osposItemIds) {
      let product = await this.prisma.products.findUnique({
        where: { ospos_item_id: osposItemId }
      });

      if (!product) {
        product = await this.prisma.products.create({
          data: {
            product_id: crypto.randomUUID(),
            ospos_item_id: osposItemId,
            is_active: true,
          }
        });
      }

      packageItemsData.push({
        package_id: packageId,
        product_id: product.product_id,
        quantity: 1,
      });
    }

    const pkg = await this.prisma.packages.create({
      data: {
        package_id: packageId,
        package_name: data.name,
        description: data.description,
        discount_percentage: data.discountPercent,
        status: 'active',
      },
    });

    await this.prisma.package_items.createMany({
      data: packageItemsData,
    });

    return this.findOne(pkg.package_id, true);
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.packages.delete({ where: { package_id: id } });
  }
}
