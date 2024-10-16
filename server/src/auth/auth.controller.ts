import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { ApiTags, ApiResponse, ApiOperation } from '@nestjs/swagger';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

  @ApiTags('Авторизация')
  @Controller('api/auth')
  export class AuthController {
    constructor(private readonly authService: AuthService) {}
    
    @ApiOperation({})
    @ApiResponse({})
    @Post('/login')
    login(@Body() userDto: CreateUserDto) {

      return this.authService.login(userDto);
    }
  
    @ApiOperation({})
    @ApiResponse({})
    @Post('registration')
    registration(@Body() userDto: CreateUserDto) {

      return this.authService.registration(userDto);
    }



  // @ApiOperation({})
  // @ApiResponse({})
  // @Post()
  // create(@Body() createAuthDto: CreateAuthDto) {
  //   return this.authService.create(createAuthDto);
  // }

  // @ApiOperation({})
  // @ApiResponse({})
  // @Get()
  // findAll() {
  //   return this.authService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateAuthDto: UpdateAuthDto) {
  //   return this.authService.update(+id, updateAuthDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }
}
