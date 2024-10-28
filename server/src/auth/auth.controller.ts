import { Controller, Post, Body, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthUserDto } from 'src/auth/dto/auth-user.dto';
import { Response } from 'express';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно авторизован' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @Post('/login')
  async login(@Body() userDto: CreateAuthUserDto) {
    
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Ошибка при регистрации' })
  @Post('/registration')
  async registration(@Body() userDto: CreateUserDto, @Res() res: Response) {

    await this.authService.registration(userDto);

    return res.status(201).json({ message: 'Пользователь успешно зарегистрирован' })
  }

}
