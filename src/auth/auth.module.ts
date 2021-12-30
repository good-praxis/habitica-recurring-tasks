import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { EncryptionModule } from '../encryption/encryption.module';
import { UserModule } from '../user/user.module';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [UserModule, EncryptionModule, PassportModule],
  providers: [AuthService, LocalStrategy],
})
export class AuthModule {}
