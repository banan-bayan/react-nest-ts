import { HttpException, HttpStatus, Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { CreateAutUserDto } from 'src/users/dto/auth-user.dto';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs';
import { User } from 'src/users/users.model';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userServie: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(authUserDto: CreateAutUserDto) {
    const user = await this.validateUser(authUserDto);

    return this.generateToken(user);
  }

  async registration(userDto: CreateUserDto) {
    const condidate = await this.userServie.getUserByEmail(userDto.email);
    if (condidate) {
      throw new HttpException(
        'Пользователь с таким  EMAIL уже зарегистрирован',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashPassword = await bcrypt.hash(userDto.password, 5);

    const user = await this.userServie.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user: User) {
    const payload = { email: user.email, id: user.id, role: user.roles };

    return {
      token: this.jwtService.sign(payload),
    };
  }

  private async validateUser(authUserDto: CreateAutUserDto) {
    const user = await this.userServie.getUserByEmail(authUserDto.email);
    const isPasswordEquals = await bcrypt.compare(
      authUserDto.password,
      user.password,
    );

    if (user && isPasswordEquals) {
      return user;
    }

    throw new UnauthorizedException({
      message: 'Некорректный email или пароль',
    });
  }

}
