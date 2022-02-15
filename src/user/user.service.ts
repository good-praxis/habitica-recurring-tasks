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
      .catch(() => {
        // Assuming this is a 404 error
        throw new Error('User not found');
      });

    // verification of api_key is done in the auth service
    return result;
  }

  async create({ user_id, api_key }) {
    if (await this.userRepository.findOne({ user_id })) {
      return; // TODO: return proper code?
    }

    const user = this.encryptionService.encryptApiKey(
      { user_id } as User,
      api_key,
    );
    await this.userRepository.save(user);
    return await this.userRepository.findOne({
      where: {
        user_id,
      },
    });
  }
}
