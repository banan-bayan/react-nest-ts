import { ApiProperty } from '@nestjs/swagger';

export class CreateWorkRequestDto {

  @ApiProperty({ example: 2, description: 'ID сотрудника' })
  readonly employeeId?: number;

  @ApiProperty({ example: '2024-10-08T10:00:00.000Z', description: 'Дата и время начала работы' })
  readonly startDate: Date;

  @ApiProperty({ example: '2024-10-08T11:00:00.000Z', description: 'Дата и время окончания работы' })
  readonly endDate: Date;

  @ApiProperty({ example: [1], description: 'Массив типов работ сотрудника' })
  readonly employeeWorkTypeIds: number[];

}
