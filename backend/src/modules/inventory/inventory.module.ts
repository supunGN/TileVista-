import { Module } from '@nestjs/common';
import { InventoryService } from './inventory.service';
import { InventoryController } from './inventory.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';

@Module({
  imports: [OsposIntegrationModule],
  providers: [InventoryService],
  controllers: [InventoryController],
  exports: [InventoryService],
})
export class InventoryModule {}
