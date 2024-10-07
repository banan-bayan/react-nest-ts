import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeBaseScheduleDto {

  @ApiProperty({ example: '2024-10-07T09:00:00Z', description: 'Дата и время начала работы' })
  start: Date;

  @ApiProperty({ example: '2024-10-07T18:00:00Z', description: 'Дата и время окончания работы' })
  end: Date;

  @ApiProperty({ example: 1, description: 'Идентификатор сотрудника' })
  employeeId: number;
}
