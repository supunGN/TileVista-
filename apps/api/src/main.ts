import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS for client app
  app.enableCors({
    origin: true, // Allow all origins for development, specify in production
    credentials: true,
  });

  // Set standard API route prefixes
  app.setGlobalPrefix('api');

  // Enforce data validations globally
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    })
  );

  const port = process.env.PORT || 4000;
  await app.listen(port);
  console.log(`\n🚀 TILEVISTA REST API IS READY AT: http://localhost:${port}/api\n`);
}
bootstrap();
