import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { getRepositoryToken, TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { EncryptionModule } from '../encryption/encryption.module';

@Module({
  imports: [TypeOrmModule.forFeature([User]), EncryptionModule],
  providers: [
    UserService,
    {
      provide: getRepositoryToken(User),
      useValue: {},
    },
  ],
  exports: [TypeOrmModule],
})
export class UserModule {}
