import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeWorkTypeDto {
  @ApiProperty({ example: 'Прикрутить розетку', description: 'Описание услуги' })
  readonly title: string;

  @ApiProperty({ example: 555, description: 'Цена услуги' })
  readonly price: number;

  @ApiProperty({ example: 1, description: 'Идентификатор типа работы' })
  readonly id: number;
}
