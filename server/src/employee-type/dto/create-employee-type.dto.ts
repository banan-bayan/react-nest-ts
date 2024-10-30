import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeTypeDto {
  @ApiProperty({ example: 'Электрик', description: 'Профессия специалиста' })
  readonly title: string;

  @ApiProperty({ example: 1, description: 'Идентификатор специалиста' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'Идентификатор типа работы' })
  readonly workTypeId: number;
}
