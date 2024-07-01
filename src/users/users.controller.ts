import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/createUser.dto';
import { User } from './entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(@Body() data: CreateUserDto): Promise<User> {
    return this.usersService.createUser(data);
  }

  @Get(':id')
  async findSingleUser(@Param('id', ParseIntPipe) id: number): Promise<User> {
    return this.usersService.findSingleUser(id);
  }

  @Get()
  async findAll() {
    return this.usersService.findAll();
  }
}
