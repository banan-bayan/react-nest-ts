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
@UseGuards(RolesGuard)
@Roles(ERoles.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 201, type: User, description: 'Пользователь успешно зареган' })
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
  findOne(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 204, description: 'Пользователь успешно удален' })
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.removeUser(id);
  }
}
