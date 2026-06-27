import {
  Controller,
  Get,
  Put,
  Post,
  Param,
  Body,
  ParseIntPipe,
  UseInterceptors,
  UploadedFile,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import * as path from 'path';
import * as fs from 'fs';
import { ProductsService } from './products.service';
import { UpsertAssetDto } from './dto/unified-item.dto';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

// ── Upload directories (created at startup if missing) ──
const UPLOAD_BASE = path.join(process.cwd(), 'uploads');
const IMAGE_DIR = path.join(UPLOAD_BASE, 'images');
const MODEL_DIR = path.join(UPLOAD_BASE, 'models');

for (const dir of [IMAGE_DIR, MODEL_DIR]) {
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
}

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ──────────────────────────────────────────────────────────────
  // PUBLIC ENDPOINTS — accessible without authentication
  // ──────────────────────────────────────────────────────────────

  /**
   * GET /api/items
   * Returns all active OSPOS items merged with their visual asset entries.
   */
  @Get('items')
  async findAll() {
    return this.productsService.findAll();
  }

  /**
   * GET /api/categories
   * Returns the category hierarchy from OSPOS.
   */
  @Get('categories')
  async getCategories() {
    return this.productsService.getCategories();
  }

  /**
   * GET /api/items/:id
   * Returns a single merged item by OSPOS item_id.
   */
  @Get('items/:id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.findOne(id);
  }

  // ──────────────────────────────────────────────────────────────
  // ADMIN ENDPOINTS — protected by JWT + ADMIN role
  // ──────────────────────────────────────────────────────────────

  /**
   * GET /api/admin/items
   * Returns all items with asset status indicators for the admin dashboard.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Get('admin/items')
  async adminFindAll() {
    return this.productsService.findAll();
  }

  /**
   * PUT /api/admin/items/:id/asset
   * Creates or updates the asset catalog metadata for a specific OSPOS item.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Put('admin/items/:id/asset')
  async upsertAsset(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpsertAssetDto,
  ) {
    return this.productsService.upsertAsset(id, dto);
  }

  /**
   * POST /api/admin/items/:id/upload-image
   * Uploads a product image and sets imageUrl on the asset catalog.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/items/:id/upload-image')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: IMAGE_DIR,
        filename: (req, file, cb) => {
          const itemId = req.params.id;
          const ext = path.extname(file.originalname) || '.jpg';
          cb(null, `${itemId}-temp${ext}`);
        },
      }),
      fileFilter: (req, file, cb) => {
        const allowed = /\.(jpg|jpeg|png|webp|avif)$/i;
        if (!allowed.test(file.originalname)) {
          return cb(
            new BadRequestException('Only image files (jpg, png, webp) are allowed.'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 10 * 1024 * 1024 }, // 10 MB
    }),
  )
  async uploadImage(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded.');

    const item = await this.productsService.findOne(id);
    const ext = path.extname(file.originalname) || '.jpg';
    const slug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newFilename = `${slug}-${id}${ext}`;
    const newPath = path.join(IMAGE_DIR, newFilename);

    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }
    fs.renameSync(file.path, newPath);

    const imageUrl = `/uploads/images/${newFilename}`;
    await this.productsService.setImageUrl(id, imageUrl);
    return { imageUrl };
  }

  /**
   * POST /api/admin/items/:id/upload-glb
   * Uploads a GLB 3D model file and sets glbUrl on the asset catalog.
   */
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  @Post('admin/items/:id/upload-glb')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: MODEL_DIR,
        filename: (req, file, cb) => {
          const itemId = req.params.id;
          cb(null, `${itemId}-temp.glb`);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.toLowerCase().endsWith('.glb')) {
          return cb(
            new BadRequestException('Only .glb files are allowed.'),
            false,
          );
        }
        cb(null, true);
      },
      limits: { fileSize: 100 * 1024 * 1024 }, // 100 MB
    }),
  )
  async uploadGlb(
    @Param('id', ParseIntPipe) id: number,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) throw new BadRequestException('No file uploaded.');

    const item = await this.productsService.findOne(id);
    const slug = item.name
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');
    
    const newFilename = `${slug}-${id}.glb`;
    const newPath = path.join(MODEL_DIR, newFilename);

    if (fs.existsSync(newPath)) {
      fs.unlinkSync(newPath);
    }
    fs.renameSync(file.path, newPath);

    const glbUrl = `/uploads/models/${newFilename}`;
    await this.productsService.setGlbUrl(id, glbUrl);
    return { glbUrl };
  }
}
