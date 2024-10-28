import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 1, description: 'Идентификатор сотрудника' })
  readonly id: number;

  @ApiProperty({ example: 'Путин Владимир Владимирович', description: 'ФИО сотрудника' })
  readonly name: string;

}
