import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ example: 1, description: 'id' })
  readonly id: number;
  @ApiProperty({ example: 'USER', description: 'Права пользователя' })
  readonly description: string;
}
