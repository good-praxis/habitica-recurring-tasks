import { Injectable } from '@nestjs/common';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private readonly encryptionService: EncryptionService,
  ) {}

  async validateUser(user_id: string, api_key: string): Promise<any> {
    const user = await this.userService.findOne(user_id, api_key);
    if (user && this.encryptionService.decryptApiKey(user) === api_key) {
      return user;
    }
    throw new Error('Invalid credentials'); // TODO: handle error -> Reject
  }
}
