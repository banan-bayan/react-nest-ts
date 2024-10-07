import { Controller, Body, Post, Get } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { User } from './users.model';

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {};
   
  @ApiOperation({summary: 'создать клиента'})
  @ApiResponse({status: 200, type: User})
  @Post()
  create(@Body() userDto: CreateUserDto) {

    return this.usersService.createUser(userDto);
  }

  @ApiOperation({summary: 'получить всех пользователей'})
  @ApiResponse({status: 200, type: [User]})
  @Get()
  getAll() {
    
    return this.usersService.getAllUser
  }
}
