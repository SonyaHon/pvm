import { Strategy } from 'passport-local';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UserEntity } from '../entity/user';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super();
  }

  async validate(username: string, password: string): Promise<UserEntity> {
    try {
      return await this.authService.validateUser(username, password);
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
