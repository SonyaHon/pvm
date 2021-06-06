import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from '../guards/auth.guard';

class UserDTO {
  username: string;
  password: string;
}

class IdDTO {
  id: string;
}

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: UserDTO) {
    return (await this.userService.create(body)).frontendify();
  }

  @UseGuards(AuthGuard)
  @Get()
  async getOne(@Query() query: IdDTO) {
    return (await this.userService.getById(query.id)).frontendify();
  }
}
