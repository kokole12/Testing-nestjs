import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';

describe('Users Controller', () => {
  let controller: UsersController;
  let service: UsersService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            createUser: jest.fn(),
            findSingleUser: jest.fn(),
            findAll: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = moduleRef.get<UsersController>(UsersController);
    service = moduleRef.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('find single user', () => {
    it('should return a single user by the id', async () => {
      const user = { id: 1, name: 'David' };
      jest.spyOn(service, 'findSingleUser').mockResolvedValue(user);

      const result = await controller.findSingleUser(user.id);

      expect(result).toEqual(user);
    });
  });

  describe('create user', () => {
    it('should create a new user', async () => {
      const newUser = { id: 2, name: 'jabari' };

      jest.spyOn(service, 'createUser').mockResolvedValue(newUser);

      const result = await controller.createUser(newUser);

      expect(result).toEqual(newUser);
    });
  });

  describe('findAll', () => {
    it('should return an array of all users', async () => {
      const users: User[] = [
        {
          id: 3,
          name: 'alfanso',
        },
        {
          id: 5,
          name: 'palma',
        },
      ];

      jest.spyOn(service, 'findAll').mockResolvedValue(users);

      const result = await controller.findAll();

      expect(result).toEqual(users);
    });
  });
});
