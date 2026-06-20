import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { CartController } from './cart.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';

@Module({
  imports: [OsposIntegrationModule],
  providers: [CartService],
  controllers: [CartController],
  exports: [CartService],
})
export class CartModule {}
