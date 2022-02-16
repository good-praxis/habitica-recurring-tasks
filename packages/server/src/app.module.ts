import { join } from 'path';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { UserModule } from './user/user.module';
import { EncryptionModule } from './encryption/encryption.module';
import { AuthModule } from './auth/auth.module';
import { SessionModule } from './session/session.module';
@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: join(__dirname, '..', '..', '..', '.env'),
    }),
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
    SessionModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
