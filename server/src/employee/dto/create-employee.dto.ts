import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeDto {
  @ApiProperty({ example: 1, description: 'Идентификатор сотрудника' })
  readonly id: number;

  @ApiProperty({ example: 'Путин Владимир Владимирович', description: 'ФИО сотрудника' })
  readonly name: string;

  @ApiProperty({ example: 2, description: 'Идентификатор типа сотрудника' })
  readonly typeId: number;
}
