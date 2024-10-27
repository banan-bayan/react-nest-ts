import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAuthUserDto } from 'src/auth/dto/auth-user.dto';

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @ApiOperation({ summary: 'Вход пользователя' })
  @ApiResponse({ status: 200, description: 'Пользователь успешно авторизован' })
  @ApiResponse({ status: 401, description: 'Неверные учетные данные' })
  @Post('/login')
  login(@Body() userDto: CreateAuthUserDto) {
    
    return this.authService.login(userDto);
  }

  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiResponse({ status: 201, description: 'Пользователь успешно зарегистрирован' })
  @ApiResponse({ status: 400, description: 'Ошибка при регистрации' })
  @Post('/registration')
  registration(@Body() userDto: CreateUserDto) {

    return this.authService.registration(userDto);
  }

}
