import { Test, TestingModule } from '@nestjs/testing';
import { EncryptionService } from '../encryption/encryption.service';
import { UserService } from '../user/user.service';
import { AuthService } from './auth.service';

describe('AuthService', () => {
  let service: AuthService;

  const mockUserService = {
    findOne: jest.fn((user_id: string, api_key: string) => {
      if (user_id === 'user_id') {
        return { user_id, api_key };
      } else {
        return new Error('User not found');
      }
    }),
  };
  const mockEncryptionService = {
    decryptApiKey: jest.fn((user: any) => user.api_key),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        { provide: UserService, useValue: mockUserService },
        { provide: EncryptionService, useValue: mockEncryptionService },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should validate a user with valid credentials', () => {
    const user = {
      user_id: 'user_id',
      api_key: 'api_key',
    };

    const result = service.validateUser(user.user_id, user.api_key);

    result.then((res) => {
      expect(res).toEqual(user);
      expect(mockEncryptionService.decryptApiKey).toHaveBeenCalledWith(user);
    });
  });

  it('should throw an error at invalid credentials', () => {
    const user = {
      user_id: 'user_id',
      api_key: 'wrong_api_key',
    };

    const result = service.validateUser('invalid_user_id', user.api_key);

    result.catch((err) => {
      expect(err).toEqual(new Error('Invalid credentials'));
    });
  });
});
