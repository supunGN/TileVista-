import { Injectable, BadRequestException } from '@nestjs/common';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';
import { PrismaService } from '../../prisma/prisma.service';

/**
 * CartService manages in-memory user carts.
 * Item validation is done against live OSPOS stock.
 * Cart items are keyed by OSPOS item_id (integer).
 */
@Injectable()
export class CartService {
  constructor(
    private readonly osposService: OsposIntegrationService,
    private readonly prisma: PrismaService,
  ) {}

  // In-memory cart store: userId -> array of { osposItemId, quantity }
  private userCarts = new Map<string, { osposItemId: number; quantity: number }[]>();

  async getCart(userId: string) {
    const items = this.userCarts.get(userId) || [];
    if (items.length === 0) return [];

    // Fetch all OSPOS items in one call to avoid N+1
    const allOsposItems = await this.osposService.fetchAllItems();
    const osposItemMap = new Map(allOsposItems.map((i) => [i.item_id, i]));

    // Pre-fetch all local products to check visibility gate
    const localProducts = await this.prisma.products.findMany({
      where: { ospos_item_id: { in: items.map(i => i.osposItemId) } },
      include: { product_assets: true }
    });
    const localProductMap = new Map(localProducts.map(p => [p.ospos_item_id, p]));

    return items
      .map((item) => {
        const osposItem = osposItemMap.get(item.osposItemId);
        const localProduct = localProductMap.get(item.osposItemId);
        const hasAssetEntry = !!localProduct?.product_assets;
        const isVisible = localProduct?.product_assets?.is_visible ?? localProduct?.is_active ?? true;
        
        if (!osposItem || !localProduct || !hasAssetEntry || !isVisible) {
          return {
            osposItemId: item.osposItemId,
            item: osposItem ?? { name: 'Unknown Item', price: 0, item_id: item.osposItemId },
            quantity: item.quantity,
            lineTotal: 0,
            isAvailable: false,
          };
        }

        return {
          osposItemId: item.osposItemId,
          item: osposItem,
          quantity: item.quantity,
          lineTotal: osposItem.price * item.quantity,
          isAvailable: true,
        };
      })
      .filter(Boolean);
  }

  async addToCart(userId: string, osposItemId: number, quantity: number) {
    const allItems = await this.osposService.fetchAllItems();
    const item = allItems.find((i) => i.item_id === osposItemId);

    if (!item) {
      throw new BadRequestException(`Item not available.`);
    }

    const localProduct = await this.prisma.products.findUnique({
      where: { ospos_item_id: osposItemId },
      include: { product_assets: true }
    });
    
    const hasAssetEntry = !!localProduct?.product_assets;
    const isVisible = localProduct?.product_assets?.is_visible ?? localProduct?.is_active ?? true;
    if (!localProduct || !hasAssetEntry || !isVisible) {
      throw new BadRequestException(`Item not available.`);
    }
    if (item.quantity < quantity) {
      throw new BadRequestException(
        `Insufficient stock for "${item.name}". Available: ${item.quantity}.`,
      );
    }

    const current = this.userCarts.get(userId) || [];
    const index = current.findIndex((i) => i.osposItemId === osposItemId);
    if (index > -1) {
      current[index].quantity += quantity;
    } else {
      current.push({ osposItemId, quantity });
    }

    this.userCarts.set(userId, current);
    return this.getCart(userId);
  }

  async removeFromCart(userId: string, osposItemId: number) {
    const current = this.userCarts.get(userId) || [];
    const filtered = current.filter((item) => item.osposItemId !== osposItemId);
    this.userCarts.set(userId, filtered);
    return this.getCart(userId);
  }

  async clearCart(userId: string) {
    this.userCarts.set(userId, []);
  }
}
