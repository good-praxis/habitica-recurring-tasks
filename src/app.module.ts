import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { RendererService } from './renderer/renderer.service';
import { EncryptionModule } from './encryption/encryption.module';
import { AuthModule } from './auth/auth.module';
@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: join(__dirname, '..', 'db', 'app.sqlite'),
      entities: [join(__dirname, '**', '**.entity{.ts,.js}')],
      migrations: [join(__dirname, '..', 'db', 'migrations', '*{.ts,.js}')],
      synchronize: true,
    }),
    UserModule,
    EncryptionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [RendererService],
})
export class AppModule {}
