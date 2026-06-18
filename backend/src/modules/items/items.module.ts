import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';
import { RolesGuard } from '../auth/roles.guard';

@Module({
  imports: [
    OsposIntegrationModule,
    MulterModule.register({}),
  ],
  providers: [ItemsService, RolesGuard],
  controllers: [ItemsController],
  exports: [ItemsService],
})
export class ItemsModule {}
