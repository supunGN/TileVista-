import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { OsposIntegrationService } from './ospos.service';
import { OsposIntegrationController } from './ospos.controller';

/**
 * Module responsible for handling integrations with the external OSPOS system.
 * It encapsulates HTTP communications using NestJS HttpModule and exports
 * OsposIntegrationService for consumption by other modules (such as Orders and Analytics).
 */
@Module({
  imports: [
    HttpModule.register({
      timeout: 5000, // Safe connection timeout for POS sync
      maxRedirects: 3,
    }),
  ],
  controllers: [OsposIntegrationController],
  providers: [OsposIntegrationService],
  exports: [OsposIntegrationService],
})
export class OsposIntegrationModule {}
