import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {};

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({ status: 201, type: User, description: 'Пользователь успешно создан' })
  @Post()
  create(@Body() userDto: CreateUserDto) {
    return this.usersService.createUser(userDto);
  }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [User], description: 'Список пользователей успешно получен' })
  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }
}
