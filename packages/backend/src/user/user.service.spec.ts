import { Test, TestingModule } from '@nestjs/testing';
import { UserService } from './user.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../entity/user';
import { hash } from 'bcryptjs';
import { Config } from '../config';

describe('UserService', () => {
  let service: UserService;
  const mockRepo = {
    findOneOrFail: jest.fn().mockImplementation(async () => {
      const user = new UserEntity();
      user.id = 'id';
      user.username = 'user';
      user.password = await hash('password', Config.bcrypt.saltRounds);
      return user;
    }),
    save: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        {
          provide: getRepositoryToken(UserEntity),
          useValue: mockRepo,
        },
        UserService,
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    mockRepo.findOneOrFail.mockClear();
    mockRepo.save.mockClear();
    mockRepo.delete.mockClear();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create with right data', async () => {
    const user = await service.create({
      username: 'user',
      password: 'password',
    });
    expect(mockRepo.save).toBeCalledTimes(1);
    expect(user).toBeDefined();
  });

  it('should get by id', async () => {
    const user = await service.getById('id');
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1);
    expect(mockRepo.findOneOrFail).toBeCalledWith({ id: 'id' });
    expect(user).toBeDefined();
  });

  it('should get with right credentials', async () => {
    const user = await service.getByCredentials({
      username: 'username',
      password: 'password',
    });
    expect(mockRepo.findOneOrFail).toBeCalledTimes(1);
    expect(user).toBeDefined();
  });

  it('should not return user with bad password', async () => {
    await expect(async () => {
      await service.getByCredentials({
        username: 'username',
        password: 'invalid password',
      });
    }).rejects.toBeTruthy();
  });

  it('should update user', async () => {
    await service.update('id', {
      username: 'new username',
      password: 'new password',
    });
    expect(mockRepo.save).toBeCalledTimes(1);
  });

  it('should delete user', async () => {
    await service.remove('id');
    expect(mockRepo.delete).toBeCalledTimes(1);
  });
});
