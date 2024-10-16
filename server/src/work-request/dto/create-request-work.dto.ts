import { ApiProperty } from '@nestjs/swagger';
import { WorkRequestStatus } from '../entities/work-request.entity';

export class CreateWorkRequestDto {
  @ApiProperty({ example: 1, description: 'ID заявки' })
  readonly id: number;

  @ApiProperty({ example: 1, description: 'ID пользователя, создавшего заявку' })
  readonly userId: number;

  @ApiProperty({ example: 2, description: 'ID временного слота сотрудника' })
  readonly slotId: number;

  @ApiProperty({ example: [1, 2], description: 'Массив типов работ сотрудника' })
  readonly employeeWorkTypeIds: number[];

  @ApiProperty({ example: 'WAITING', description: 'Статус заявки', enum: WorkRequestStatus })
  readonly status: WorkRequestStatus;
}
