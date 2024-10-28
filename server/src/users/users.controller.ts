import { Controller, Body, Post, Get, UseGuards, Delete, Param, ParseIntPipe, Res } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './entities/users.entity';
import { Roles } from 'src/auth/roles-auth.decorator';
import { RolesGuard } from 'src/auth/roles.guard';
import { ERoles } from 'src/Types';
import { Response } from 'express';

@ApiTags('Пользователи')
@Controller('users')
// @UseGuards(RolesGuard)
// @Roles(ERoles.Admin)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({ summary: 'Создание нового пользователя' })
  @ApiResponse({ status: 201, type: User, description: 'Пользователь успешно создан' })
  @Post()
  async create(@Body() userDto: CreateUserDto, @Res() res: Response) {

    await this.usersService.createUser(userDto);

    return res.status(201).json({message: 'Пользователь успешно создан'});

  }

  @ApiOperation({ summary: 'Получение списка всех пользователей' })
  @ApiResponse({ status: 200, type: [User], description: 'Список пользователей успешно получен' })
  @Get()
  async getAll() {

    return this.usersService.getAllUsers();
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь успешно получен' })
  @Get(':id')
  async findOneById(@Param('id', ParseIntPipe) id: number) {

    return this.usersService.getUserById(id);
  }

  @ApiOperation({ summary: 'Получение пользователя' })
  @ApiResponse({ status: 200, type: User, description: 'Пользователь успешно получен' })
  @Get('/email/:value')
  async findOneByEmail(@Param('value') value: string) {

    return this.usersService.getUserByEmail(value);
  }

  @ApiOperation({ summary: 'Удаление пользователя' })
  @ApiResponse({ status: 204, description: 'Пользователь успешно удален' })
  @Delete(':id')
  async remove(@Param('id', ParseIntPipe) id: number, @Res() res: Response) {

    await this.usersService.removeUser(id);

    return res.status(204).json({message: 'Пользователь успешно удален'});

  }
}
