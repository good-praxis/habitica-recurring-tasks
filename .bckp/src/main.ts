import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';
import { AppModule } from './app.module';
import { existsSync, writeFileSync } from 'fs';
import * as session from 'express-session';
import { TypeormStore } from 'connect-typeorm';

async function bootstrap() {
  // ensure that the database exists
  const dbPath = join(__dirname, '..', 'db', 'app.sqlite');
  if (!existsSync(dbPath)) {
    writeFileSync(dbPath, '');
  }

  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const sessionRepository = app.get('SessionRepository');

  app.use(
    session({
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      store: new TypeormStore({
        cleanupLimit: 2,
        ttl: 86400,
      }).connect(sessionRepository),
    }),
  );

  app.useStaticAssets(join(__dirname, '..', 'public'));
  app.setBaseViewsDir(join(__dirname, '..', 'views'));

  await app.listen(3000);
}
bootstrap();
