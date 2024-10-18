import { Controller, Body, Post, Get, UseGuards, Delete, Param } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';

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
  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @Get()
  getAll() {
    return this.usersService.getAllUser();
  }


  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь' })
  @Get(':id')
  findOne(@Param('id') id: number) {

    return this.usersService.getUserById(id);
  }


  @UseGuards(RolesGuard)
  @Roles(ERoles.Admin)
  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Удаление пользователя' })
  @Delete(':id')
  remove(@Param('id') id: number) {

    return this.usersService.removeUser(id);
  }
}
