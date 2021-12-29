import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EncryptionService } from '../encryption/encryption.service';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private readonly encryptionService: EncryptionService,
  ) {}

  async findOne(user_id: string, api_key: string): Promise<User> {
    const result = await this.userRepository
      .findOne({
        where: {
          user_id,
        },
      })
      .catch((error) => {
        // TODO: handle error -> create new user
        throw error;
      });

    // verify api_key
    if (api_key === this.encryptionService.decryptApiKey(result)) {
      return result;
    } else {
      throw new Error('Invalid api_key'); // TODO: handle error -> no match
    }
  }
}
