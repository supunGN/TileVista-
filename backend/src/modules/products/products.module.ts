import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';
import { PrismaModule } from '../../prisma/prisma.module';

@Module({
  imports: [OsposIntegrationModule, PrismaModule],
  providers: [ProductsService],
  controllers: [ProductsController],
  exports: [ProductsService],
})
export class ProductsModule {}
