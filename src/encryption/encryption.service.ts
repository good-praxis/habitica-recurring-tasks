import { Injectable } from '@nestjs/common';
import { User } from '../user/user.entity';
import {
  CipherKey,
  createCipheriv,
  createDecipheriv,
  hkdfSync,
  randomBytes,
} from 'crypto';

@Injectable()
export class EncryptionService {
  decryptApiKey(user: User): string {
    // decrypt and returns api_key
    const iv = user.api_key.slice(0, 16);
    const api_key = user.api_key.slice(16);
    const decipher = createDecipheriv('aes-256-cbc', this.getUserKey(user), iv);

    decipher.update(api_key);
    return decipher.final().toString();
  }

  encryptApiKey(user: User, api_key: string): User {
    // encrypts api_key and sets it on the User, returns User
    const iv = randomBytes(16);
    const cipher = createCipheriv('aes-256-cbc', this.getUserKey(user), iv);

    cipher.update(api_key);
    const encrypted = cipher.final();
    user.api_key = Buffer.concat([iv, encrypted]);
    return user;
  }

  getSecret(user: User): Buffer {
    // returns APP_SECRET concatenated with user secret
    const app_secret = Buffer.from(process.env.APP_SECRET, 'base64');
    return Buffer.concat([app_secret, user.secret]);
  }

  getUserKey(user: User): CipherKey {
    // Returns a 256 bit key derived from the user key
    const key = hkdfSync('sha256', this.getSecret(user), '', '', 32);

    return key as CipherKey;
  }
}