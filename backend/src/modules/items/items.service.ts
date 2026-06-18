import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService, OsposItem } from '../integrations/ospos/ospos.service';
import { UnifiedItemDto, UpsertAssetDto } from './dto/unified-item.dto';

@Injectable()
export class ItemsService {
  private readonly logger = new Logger(ItemsService.name);
  private readonly backendBaseUrl =
    process.env.BACKEND_PUBLIC_URL || 'http://localhost:4000';

  constructor(
    private readonly prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  // ──────────────────────────────────────────────────────────────
  // Private helpers
  // ──────────────────────────────────────────────────────────────

  /**
   * Maps a raw OSPOS item + optional asset catalog row into a UnifiedItemDto.
   */
  private buildDto(
    osposItem: OsposItem,
    asset: {
      imageUrl: string | null;
      glbUrl: string | null;
      scaleX: number;
      scaleY: number;
      scaleZ: number;
      rotationY: number;
      tags: string | null;
      material: string | null;
      finish: string | null;
      isEnabled: boolean;
      notes: string | null;
    } | null,
  ): UnifiedItemDto {
    const dto = new UnifiedItemDto();
    dto.itemId = osposItem.item_id;
    dto.name = osposItem.name;
    dto.category = osposItem.category ?? '';
    dto.sku = osposItem.sku ?? '';
    dto.description = osposItem.description ?? null;
    dto.price = osposItem.price;
    dto.quantity = osposItem.quantity;

    if (asset) {
      dto.imageUrl = asset.imageUrl ?? null;
      dto.glbUrl = asset.glbUrl ?? null;
      dto.scale = { x: asset.scaleX, y: asset.scaleY, z: asset.scaleZ };
      dto.rotationY = asset.rotationY;
      dto.tags = asset.tags ? asset.tags.split(',').map((t) => t.trim()) : [];
      dto.material = asset.material ?? null;
      dto.finish = asset.finish ?? null;
      dto.isEnabled = asset.isEnabled;
      dto.notes = asset.notes ?? null;
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

  // ──────────────────────────────────────────────────────────────
  // Public API — read
  // ──────────────────────────────────────────────────────────────

  /**
   * Returns all active OSPOS items merged with their TileVista asset entries.
   * Items without an asset entry are still included (hasAssetEntry = false).
   */
  async findAll(): Promise<UnifiedItemDto[]> {
    const [osposItems, assetCatalog] = await Promise.all([
      this.osposService.fetchAllItems(),
      this.prisma.itemAssetCatalog.findMany(),
    ]);

    const assetMap = new Map(assetCatalog.map((a) => [a.osposItemId, a]));

    return osposItems.map((item) =>
      this.buildDto(item, assetMap.get(item.item_id) ?? null),
    );
  }

  /**
   * Returns a single merged item by its OSPOS item_id.
   * Throws 404 if OSPOS does not have this item.
   */
  async findOne(osposItemId: number): Promise<UnifiedItemDto> {
    const [osposItems, asset] = await Promise.all([
      this.osposService.fetchAllItems(),
      this.prisma.itemAssetCatalog.findUnique({
        where: { osposItemId },
      }),
    ]);

    const osposItem = osposItems.find((i) => i.item_id === osposItemId);
    if (!osposItem) {
      throw new NotFoundException(`OSPOS item with ID ${osposItemId} not found.`);
    }

    return this.buildDto(osposItem, asset ?? null);
  }

  // ──────────────────────────────────────────────────────────────
  // Public API — write (admin only)
  // ──────────────────────────────────────────────────────────────

  /**
   * Creates or updates the TileVista asset catalog entry for an OSPOS item.
   */
  async upsertAsset(
    osposItemId: number,
    dto: UpsertAssetDto,
  ): Promise<UnifiedItemDto> {
    await this.prisma.itemAssetCatalog.upsert({
      where: { osposItemId },
      create: {
        osposItemId,
        scaleX: dto.scaleX ?? 1,
        scaleY: dto.scaleY ?? 1,
        scaleZ: dto.scaleZ ?? 1,
        rotationY: dto.rotationY ?? 0,
        tags: dto.tags ?? null,
        material: dto.material ?? null,
        finish: dto.finish ?? null,
        isEnabled: dto.isEnabled ?? true,
        notes: dto.notes ?? null,
      },
      update: {
        ...(dto.scaleX !== undefined && { scaleX: dto.scaleX }),
        ...(dto.scaleY !== undefined && { scaleY: dto.scaleY }),
        ...(dto.scaleZ !== undefined && { scaleZ: dto.scaleZ }),
        ...(dto.rotationY !== undefined && { rotationY: dto.rotationY }),
        ...(dto.tags !== undefined && { tags: dto.tags }),
        ...(dto.material !== undefined && { material: dto.material }),
        ...(dto.finish !== undefined && { finish: dto.finish }),
        ...(dto.isEnabled !== undefined && { isEnabled: dto.isEnabled }),
        ...(dto.notes !== undefined && { notes: dto.notes }),
      },
    });

    return this.findOne(osposItemId);
  }

  /**
   * Updates the imageUrl on the asset catalog entry after a successful file upload.
   */
  async setImageUrl(osposItemId: number, imageUrl: string): Promise<void> {
    await this.prisma.itemAssetCatalog.upsert({
      where: { osposItemId },
      create: { osposItemId, imageUrl },
      update: { imageUrl },
    });
  }

  /**
   * Updates the glbUrl on the asset catalog entry after a successful file upload.
   */
  async setGlbUrl(osposItemId: number, glbUrl: string): Promise<void> {
    await this.prisma.itemAssetCatalog.upsert({
      where: { osposItemId },
      create: { osposItemId, glbUrl },
      update: { glbUrl },
    });
  }
}
