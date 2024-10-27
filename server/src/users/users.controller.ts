import { Controller, Body, Post, Get, UseGuards, Delete, Param, ParseIntPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

@ApiTags('Пользователи')
@Controller('users')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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

    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь успешно получен' })
  @Get(':id')
  findOneById(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь успешно получен' })
  @Get('/email/:value')
  findOneByEmail(@Param('value') value: string) {

    return this.usersService.getUserByEmail(value);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 204, description: 'Пользователь успешно удален' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.removeUser(id);
  }
}
