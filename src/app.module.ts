import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { EncryptionService } from './encryption/encryption.service';
import { RendererService } from './renderer/renderer.service';
import { EncryptionModule } from './encryption/encryption.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'better-sqlite3',
      database: '../db/app.db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    }),
    EncryptionModule,
  ],
  controllers: [AppController],
  providers: [RendererService],
})
export class AppModule {}
