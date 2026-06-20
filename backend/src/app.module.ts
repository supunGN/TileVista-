import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { CartModule } from './modules/cart/cart.module';
import { OrdersModule } from './modules/orders/orders.module';
import { PackagesModule } from './modules/packages/packages.module';
import { DesignerModule } from './modules/designer/designer.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { OsposIntegrationModule } from './modules/integrations/ospos/ospos.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    InventoryModule,
    CartModule,
    OrdersModule,
    PackagesModule,
    DesignerModule,
    AnalyticsModule,
    OsposIntegrationModule,
  ],
})
export class AppModule {}
