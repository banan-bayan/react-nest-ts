import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ example: 'pididdy@gmail.com', description: 'Почтовый адрес' })
  readonly email: string;
  @ApiProperty({ example: '12345', description: 'Пароль' })
  readonly password: string;
  @ApiProperty({ example: 'Дмитрий', description: 'Имя пользователя' })
  readonly name: string;
}
