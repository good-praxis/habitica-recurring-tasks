import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../user/user.entity';
import { EncryptionService } from './encryption.service';
import { hkdfSync, randomBytes } from 'crypto';
import { ConfigModule } from '@nestjs/config';

describe('EncryptionService', () => {
  let service: EncryptionService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule.forRoot({ envFilePath: ['.test.env'] })],
      providers: [EncryptionService],
    }).compile();

    const user = new User();
    user.secret = Buffer.from('secret');
    user.api_key = Buffer.from('api_key');
    user.user_id = 'user_id';

    service = module.get<EncryptionService>(EncryptionService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should concat the app secret with the user secret', () => {
    const user = new User();
    user.secret = randomBytes(32);

    const secret = service.getSecret(user);
    expect(secret.length).toBe(32 + 32);
    expect(secret.slice(32).toString('base64')).toBe(
      user.secret.toString('base64'),
    );
  });

  it('should encrypt a given api key', () => {
    const user = new User();
    user.secret = randomBytes(32);
    service.encryptApiKey(user, 'api_key');
    expect(user.api_key.toString()).not.toBe('api_key');
  });

  it('should prepend the iv to the encrypted api key', () => {
    const user = new User();
    user.secret = randomBytes(32);
    service.encryptApiKey(user, 'api_key');
    expect(user.api_key.length).toBe(32);
  });

  it("should generate the user's key", () => {
    const user = new User();
    user.secret = randomBytes(32);
    const controlKey = hkdfSync('sha256', service.getSecret(user), '', '', 32);

    const key = service.getUserKey(user) as Buffer;
    expect(Buffer.from(key).length).toBe(32);
    expect(Buffer.from(key)).toStrictEqual(Buffer.from(controlKey));
  });

  it("should be able to decrypt a user's encrypted api_key", () => {
    let user = new User();
    user.secret = randomBytes(32);
    user = service.encryptApiKey(user, 'api_key');

    const api_key = service.decryptApiKey(user);
    expect(api_key).toBe('api_key');
  });

  it('should be able to handle full-sized keys', () => {
    let user = new User();
    user.user_id = 'full-sized-key';
    user.secret = randomBytes(32);
    user = service.encryptApiKey(user, 'xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
    console.log(user);

    const api_key = service.decryptApiKey(user);
    expect(user.api_key.length).toBe(64);
    expect(api_key).toBe('xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx');
  });
});
