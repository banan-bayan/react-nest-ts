import { ApiProperty } from '@nestjs/swagger';

export class CreateEmployeeSlotScheduleDto {
  @ApiProperty({ example: '2024-10-07T10:00:00Z', description: 'Дата и время начала временного слота' })
  startDate: Date;

  @ApiProperty({ example: '2024-10-08T10:00:00Z', description: 'Дата и время окончания временного слота' })
  endDate: Date;

  @ApiProperty({ example: 1, description: 'ID слота' })
  id: number;
}
