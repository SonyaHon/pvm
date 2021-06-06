import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../entity/user';
import { compare, hash } from 'bcryptjs';
import { Config } from '../config';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  public async getById(id: string): Promise<UserEntity> {
    return this.userRepository.findOneOrFail({
      id,
    });
  }

  public async getByCredentials(credentials: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const user = await this.userRepository.findOneOrFail({
      username: credentials.username,
    });
    if (!(await compare(credentials.password, user.password))) {
      throw new Error('User not found');
    }
    return user;
  }

  public async create(data: {
    username: string;
    password: string;
  }): Promise<UserEntity> {
    const user = new UserEntity();
    user.username = data.username;
    user.password = await hash(data.password, Config.bcrypt.saltRounds);

    await this.userRepository.save(user);
    return user;
  }

  public async update(
    id: string,
    data: {
      username?: string;
      password?: string;
    },
  ): Promise<void> {
    const user = await this.userRepository.findOneOrFail({ id });
    if (data.username) {
      user.username = data.username;
    }
    if (data.password) {
      user.password = await hash(data.password, Config.bcrypt.saltRounds);
    }
    await this.userRepository.save(user);
  }

  public async remove(id: string): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
