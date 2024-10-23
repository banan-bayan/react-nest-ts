import { ApiProperty } from '@nestjs/swagger';
import { WorkRequestStatus } from 'src/Types';

export class CreateWorkRequestDto {
  @ApiProperty({ example: 1, description: 'ID заявки' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'ID пользователя, создавшего заявку' })
  readonly userId: number;

  @ApiProperty({ example: 2, description: 'ID временного слота сотрудника' })
  readonly slotId: number;

  @ApiProperty({ example: '2024-10-07T10:00:00Z', description: 'Дата и время начала работы' })
  readonly startDate: Date;

  @ApiProperty({ example: '2024-10-08T10:00:00Z', description: 'Дата и время окончания работы' })
  readonly endDate: Date;

  @ApiProperty({ example: [1, 2], description: 'Массив типов работ сотрудника' })
  readonly employeeWorkTypeIds: number[];

  @ApiProperty({ example: 'WAITING', description: 'Статус заявки', enum: WorkRequestStatus })
  readonly status: WorkRequestStatus;
}
