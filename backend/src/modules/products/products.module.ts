/**
 * @deprecated ProductsModule has been replaced by ItemsModule.
 * The Product table no longer exists. All items are sourced live from OSPOS
 * and enriched with TileVista-specific asset data via ItemAssetCatalog.
 * 
 * This file is kept as a placeholder to prevent git history loss.
 * The module is NOT registered in AppModule.
 */

import { Module } from '@nestjs/common';

@Module({})
export class ProductsModule {}
