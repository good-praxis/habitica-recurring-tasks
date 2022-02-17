import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from './auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({ usernameField: 'user_id', passwordField: 'api_key' });
  }

  async validate(user_id: string, api_key: string): Promise<any> {
    const user = await this.authService.validateUser(user_id, api_key);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
