import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';

@Module({
  imports: [OsposIntegrationModule],
  providers: [OrdersService],
  controllers: [OrdersController],
  exports: [OrdersService],
})
export class OrdersModule {}
