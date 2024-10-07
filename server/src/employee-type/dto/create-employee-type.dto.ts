import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeTypeDto {
  @ApiProperty({ example: 'Электрик', description: 'Профессия специалиста' })
  readonly title: string;
}
