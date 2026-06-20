import { Module } from '@nestjs/common';
import { PackagesService } from './packages.service';
import { PackagesController } from './packages.controller';
import { OsposIntegrationModule } from '../integrations/ospos/ospos.module';

@Module({
  imports: [OsposIntegrationModule],
  providers: [PackagesService],
  controllers: [PackagesController],
  exports: [PackagesService],
})
export class PackagesModule {}
