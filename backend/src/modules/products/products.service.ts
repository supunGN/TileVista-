import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { OsposIntegrationService } from '../integrations/ospos/ospos.service';

@Injectable()
export class ProductsService {
  private readonly logger = new Logger(ProductsService.name);

  constructor(
    private prisma: PrismaService,
    private readonly osposService: OsposIntegrationService,
  ) {}

  async findAll(query: {
    category?: string;
    brand?: string;
    color?: string;
    material?: string;
    size?: string;
    search?: string;
  }) {
    const { category, brand, color, material, size, search } = query;

    return this.prisma.product.findMany({
      where: {
        AND: [
          category ? { category } : {},
          brand ? { brand } : {},
          color ? { color } : {},
          material ? { material } : {},
          size ? { size } : {},
          search
            ? {
                OR: [
                  { name: { contains: search } },
                  { sku: { contains: search } },
                  { description: { contains: search } },
                ],
              }
            : {},
        ],
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async findOne(id: string) {
    const product = await this.prisma.product.findUnique({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  /**
   * Fetches a product from the database and merges it with live showroom stock from OSPOS.
   * If the OSPOS connection fails, it falls back to 0 stock instead of crashing.
   * 
   * @param productId The numeric product identifier
   */
  async findOneProductWithLiveStock(productId: number) {
    // 1. Fetch metadata from the local database
    const product = await this.prisma.product.findFirst({
      where: {
        OR: [
          { id: String(productId) },
          { sku: { contains: String(productId) } },
        ],
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with ID ${productId} not found in database`);
    }

    let liveStock = 0;
    let isLowStock = false;

    try {
      // 2. Fetch live stock level from OSPOS concurrently
      const stockDetails = await this.osposService.fetchStockDetailsFromPos(productId);
      liveStock = stockDetails.stock;
      isLowStock = stockDetails.isLowStock;
    } catch (error) {
      // Graceful fallback to 0/null stock to ensure the page doesn't crash for the customer
      this.logger.warn(
        `OSPOS system offline or failed for product ID ${productId}. Error: ${error.message}. Falling back to 0 stock.`
      );
    }

    return {
      ...product,
      liveStock,
      isLowStock,
    };
  }

  async create(data: any) {
    return this.prisma.product.create({ data });
  }

  async update(id: string, data: any) {
    await this.findOne(id);
    return this.prisma.product.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.product.delete({ where: { id } });
  }
}
