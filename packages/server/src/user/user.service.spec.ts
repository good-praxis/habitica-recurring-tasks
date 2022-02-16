import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { User } from './user.entity';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  const mockRepository = {
    repo: [
      {
        user_id: 'user_id',
        api_key: 'api_key',
      },
      {
        user_id: 'user_id2',
        api_key: 'wrong_api_key',
      },
    ],
    findOne: jest.fn((target) => {
      return new Promise((resolve, reject) => {
        const target_user_id = target['where']['user_id'];
        const result = mockRepository.repo.find(
          ({ user_id }) => user_id === target_user_id,
        );
        if (result) {
          resolve(result);
        } else {
          reject(new Error('User not found'));
        }
      });
    }),

    save: jest.fn((target) => {
      mockRepository.repo.push(target);
    }),
  };

  const mockEncryptionService = {
    encryptApiKey: jest.fn((target, api_key) => {
      target.api_key = api_key;
      return target;
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        { provide: getRepositoryToken(User), useValue: mockRepository },
        { provide: EncryptionService, useValue: mockEncryptionService },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should find the matching user ', () => {
    const user_id = 'user_id';
    const api_key = 'api_key';

    return service.findOne(user_id, api_key).then((result) => {
      expect(result.user_id).toEqual(user_id);
      expect(result.api_key).toEqual(api_key);
    });
  });

  it("should not error if the api_key doesn't match", () => {
    const user_id = 'user_id2';
    const api_key = 'faulty_key';

    return service.findOne(user_id, api_key).then((result) => {
      expect(result.user_id).toEqual(user_id);
      expect(result.api_key).not.toEqual(api_key);
    });
  });

  it("should not find a user that doesn't exist", () => {
    const user_id = 'imaginary_user_id';
    const api_key = 'api_key';

    return service.findOne(user_id, api_key).catch((error) => {
      expect(error.message).toEqual('User not found');
    });
  });
});
