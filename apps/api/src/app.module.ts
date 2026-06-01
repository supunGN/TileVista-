import { Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './modules/auth/auth.module';
import { UsersModule } from './modules/users/users.module';
import { ProductsModule } from './modules/products/products.module';
import { InventoryModule } from './modules/inventory/inventory.module';
import { PackagesModule } from './modules/packages/packages.module';
import { OrdersModule } from './modules/orders/orders.module';
import { DesignerModule } from './modules/designer/designer.module';
import { AnalyticsModule } from './modules/analytics/analytics.module';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { POSModule } from './modules/pos/pos.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    UsersModule,
    ProductsModule,
    InventoryModule,
    PackagesModule,
    OrdersModule,
    DesignerModule,
    AnalyticsModule,
    NotificationsModule,
    POSModule,
  ],
})
export class AppModule {}
