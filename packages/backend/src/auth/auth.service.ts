import { Inject, Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { UserEntity } from '../entity/user';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async validateUser(username: string, password: string): Promise<UserEntity> {
    return await this.userService.getByCredentials({
      username,
      password,
    });
  }
}
