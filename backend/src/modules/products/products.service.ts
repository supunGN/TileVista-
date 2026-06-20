import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService, OsposItem } from '../integrations/ospos/ospos.service';
import { UnifiedItemDto, UpsertAssetDto } from './dto/unified-item.dto';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  /**
   * Maps a raw OSPOS item and local db product metadata into a UnifiedItemDto.
   */
  private buildUnifiedItem(
    osposItem: OsposItem,
    dbProduct: any | null,
    isStaleData = false,
  ): UnifiedItemDto {
    const dto = new UnifiedItemDto();
    dto.itemId = osposItem.item_id;
    dto.name = osposItem.name;
    dto.category = osposItem.category ?? '';
    dto.sku = osposItem.sku ?? '';
    dto.description = osposItem.description ?? null;
    dto.price = osposItem.price;
    dto.quantity = osposItem.quantity;
    dto.isStaleData = isStaleData;

    if (dbProduct && dbProduct.product_assets) {
      const asset = dbProduct.product_assets;
      dto.imageUrl = asset.image_url ?? null;
      dto.glbUrl = asset.glb_url ?? null;
      
      const transform = asset.asset_transformations;
      dto.scale = {
        x: transform?.scale_x ? Number(transform.scale_x) : 1,
        y: transform?.scale_y ? Number(transform.scale_y) : 1,
        z: transform?.scale_z ? Number(transform.scale_z) : 1,
      };
      dto.rotationY = transform?.rotation_y ? Number(transform.rotation_y) : 0;
      dto.tags = asset.product_asset_tags
        ? asset.product_asset_tags.map((pat: any) => pat.tags?.tag_name).filter(Boolean)
        : [];
      dto.material = asset.material_type ?? null;
      dto.finish = asset.color_family ?? null;
      dto.isEnabled = dbProduct.is_active ?? true;
      dto.notes = null;
      dto.hasAssetEntry = true;
    } else {
      dto.imageUrl = null;
      dto.glbUrl = null;
      dto.scale = { x: 1, y: 1, z: 1 };
      dto.rotationY = 0;
      dto.tags = [];
      dto.material = null;
      dto.finish = null;
      dto.isEnabled = true;
      dto.notes = null;
      dto.hasAssetEntry = false;
    }

    return dto;
  }

  /**
   * Returns all active OSPOS items merged with their visual asset entries.
   */
  async findAll(): Promise<UnifiedItemDto[]> {
    const [osposItems, dbProducts] = await Promise.all([
      this.osposService.fetchAllItems(),
      this.prisma.products.findMany({
        include: {
          product_assets: {
            include: {
              asset_transformations: true,
              product_asset_tags: {
                include: {
                  tags: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const productMap = new Map(dbProducts.map((p) => [p.ospos_item_id, p]));

    if (osposItems.length === 0 && dbProducts.length > 0) {
      this.logger.warn('OSPOS connection failed or returned no items. Returning local database product records with fallback stock status.');
      return dbProducts.map((dbProduct) => {
        const fallbackOsposItem: OsposItem = {
          item_id: dbProduct.ospos_item_id,
          name: `Product ${dbProduct.ospos_item_id}`,
          category: 'Unknown',
          sku: '',
          description: 'Live catalog details temporarily unavailable.',
          price: 0,
          quantity: 0,
        };
        return this.buildUnifiedItem(fallbackOsposItem, dbProduct, true);
      });
    }

    return osposItems.map((item) =>
      this.buildUnifiedItem(item, productMap.get(item.item_id) ?? null, false),
    );
  }

  /**
   * Returns a single product merged with live stock and visual asset entries.
   */
  async findOne(osposItemId: number): Promise<UnifiedItemDto> {
    const [osposItems, dbProduct] = await Promise.all([
      this.osposService.fetchAllItems(),
      this.prisma.products.findUnique({
        where: { ospos_item_id: osposItemId },
        include: {
          product_assets: {
            include: {
              asset_transformations: true,
              product_asset_tags: {
                include: {
                  tags: true,
                },
              },
            },
          },
        },
      }),
    ]);

    const osposItem = osposItems.find((i) => i.item_id === osposItemId);
    if (!osposItem) {
      if (dbProduct) {
        this.logger.warn(`OSPOS item details not available for product ID ${osposItemId}. Returning local database metadata with fallback stock status.`);
        const fallbackOsposItem: OsposItem = {
          item_id: osposItemId,
          name: `Product ${osposItemId}`,
          category: 'Unknown',
          sku: '',
          description: 'Live details temporarily unavailable.',
          price: 0,
          quantity: 0,
        };
        return this.buildUnifiedItem(fallbackOsposItem, dbProduct, true);
      }
      throw new NotFoundException(`Product with ID ${osposItemId} not found.`);
    }

    return this.buildUnifiedItem(osposItem, dbProduct, false);
  }

  /**
   * Safe method used by core modules to fetch product metadata and live stock.
   */
  async findOneProductWithLiveStock(productId: number): Promise<UnifiedItemDto> {
    return this.findOne(productId);
  }

  /**
   * Creates or updates the visual assets catalog metadata for an OSPOS item.
   */
  async upsertAsset(
    osposItemId: number,
    dto: UpsertAssetDto,
  ): Promise<UnifiedItemDto> {
    let product = await this.prisma.products.findUnique({
      where: { ospos_item_id: osposItemId },
      include: { product_assets: true }
    });

    let categoryId = '';
    const defaultCategory = await this.prisma.categories.findFirst();
    if (defaultCategory) {
      categoryId = defaultCategory.category_id;
    } else {
      categoryId = crypto.randomUUID();
      await this.prisma.categories.create({
        data: {
          category_id: categoryId,
          category_name: 'General',
          description: 'Default category',
        }
      });
    }

    if (!product) {
      const productId = crypto.randomUUID();
      const assetId = crypto.randomUUID();
      const transformId = crypto.randomUUID();

      product = await this.prisma.products.create({
        data: {
          product_id: productId,
          ospos_item_id: osposItemId,
          category_id: categoryId,
          is_active: dto.isEnabled ?? true,
          product_assets: {
            create: {
              asset_id: assetId,
              material_type: dto.material ?? null,
              color_family: dto.finish ?? null,
              is_visible: dto.isEnabled ?? true,
              asset_transformations: {
                create: {
                  transform_id: transformId,
                  scale_x: dto.scaleX ?? 1.0,
                  scale_y: dto.scaleY ?? 1.0,
                  scale_z: dto.scaleZ ?? 1.0,
                  rotation_y: dto.rotationY ?? 0.0,
                }
              }
            }
          }
        },
        include: { product_assets: true }
      });
    } else {
      await this.prisma.products.update({
        where: { ospos_item_id: osposItemId },
        data: {
          is_active: dto.isEnabled ?? undefined,
          product_assets: {
            update: {
              material_type: dto.material ?? undefined,
              color_family: dto.finish ?? undefined,
              is_visible: dto.isEnabled ?? undefined,
              asset_transformations: {
                update: {
                  scale_x: dto.scaleX ?? undefined,
                  scale_y: dto.scaleY ?? undefined,
                  scale_z: dto.scaleZ ?? undefined,
                  rotation_y: dto.rotationY ?? undefined,
                }
              }
            }
          }
        }
      });
    }

    // Process tags relations if specified
    if (dto.tags !== undefined && product.product_assets) {
      const assetId = product.product_assets.asset_id;
      
      // Delete existing relationships
      await this.prisma.product_asset_tags.deleteMany({
        where: { asset_id: assetId }
      });

      const tagNames = dto.tags ? dto.tags.split(',').map((t) => t.trim()).filter(Boolean) : [];
      for (const name of tagNames) {
        let tag = await this.prisma.tags.findUnique({ where: { tag_name: name } });
        if (!tag) {
          tag = await this.prisma.tags.create({
            data: {
              tag_id: crypto.randomUUID(),
              tag_name: name,
            }
          });
        }
        await this.prisma.product_asset_tags.create({
          data: {
            asset_id: assetId,
            tag_id: tag.tag_id,
          }
        });
      }
    }

    return this.findOne(osposItemId);
  }

  /**
   * Sets product visual asset image URL.
   */
  async setImageUrl(osposItemId: number, imageUrl: string): Promise<void> {
    let product = await this.prisma.products.findUnique({
      where: { ospos_item_id: osposItemId },
      include: { product_assets: true }
    });

    if (!product) {
      await this.upsertAsset(osposItemId, { isEnabled: true });
      product = await this.prisma.products.findUnique({
        where: { ospos_item_id: osposItemId },
        include: { product_assets: true }
      });
    }

    if (product && product.product_assets) {
      await this.prisma.product_assets.update({
        where: { asset_id: product.product_assets.asset_id },
        data: { image_url: imageUrl }
      });
    }
  }

  /**
   * Sets product visual asset 3D GLB URL.
   */
  async setGlbUrl(osposItemId: number, glbUrl: string): Promise<void> {
    let product = await this.prisma.products.findUnique({
      where: { ospos_item_id: osposItemId },
      include: { product_assets: true }
    });

    if (!product) {
      await this.upsertAsset(osposItemId, { isEnabled: true });
      product = await this.prisma.products.findUnique({
        where: { ospos_item_id: osposItemId },
        include: { product_assets: true }
      });
    }

    if (product && product.product_assets) {
      await this.prisma.product_assets.update({
        where: { asset_id: product.product_assets.asset_id },
        data: { glb_url: glbUrl }
      });
    }
  }
}
