import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { existsSync, writeFileSync } from 'fs';

async function bootstrap() {
  // ensure that the database exists
  const dbPath = join(__dirname, '..', 'db', 'app.sqlite');
  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, '');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(3000);
}
bootstrap();
