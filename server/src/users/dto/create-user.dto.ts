import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'dude@gmail.com', description: 'Почтовый адрес' })
  readonly email: string;
  @ApiProperty({ example: '555555', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({ example: 'Иван', description: 'Имя пользователя' })
  readonly name: string;
}
