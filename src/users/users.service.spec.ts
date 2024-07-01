import { Repository } from 'typeorm';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';

describe('Users Service', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
  });

  describe('create User', () => {
    it('should create a user', async () => {
      const newUser = { id: 2, name: 'max' };
      jest.spyOn(userRepository, 'create').mockReturnValue(newUser);
      jest.spyOn(userRepository, 'save').mockResolvedValue(newUser);

      const result = await userService.createUser(newUser);

      expect(result).toEqual(newUser);
    });
  });

  describe('find Single User', () => {
    it('it should return a single user by id', async () => {
      const user: User = { id: 1, name: 'Davis' };
      jest.spyOn(userRepository, 'findOne').mockResolvedValue(user);

      const result = await userService.findSingleUser(user.id);
      expect(result).toEqual(user);
    });
  });

  describe('find all', () => {
    it('it should return an array of users', async () => {
      const users: User[] = [
        {
          id: 1,
          name: 'salom',
        },
        {
          id: 2,
          name: 'Angella',
        },
      ];

      jest.spyOn(userRepository, 'find').mockResolvedValue(users);

      const result = await userService.findAll();

      expect(result).toEqual(users);
    });
  });
});
