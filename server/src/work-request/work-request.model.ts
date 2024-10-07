import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User  } from 'src/users/users.model';
import { EmployeeSlotSchedule  } from 'src/employee-slot-schedule/employee-slot-schedule.model';
import { EmployeeWorkType   } from 'src/employee-work-type/employee-work-type.model';

export enum WorkRequestStatus {
  WAITING = 'WAITING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  DONE_NONPAID = 'DONE_NONPAID'
}

@Entity({ name: 'work_requests' })
export class WorkRequest {

  @ApiProperty({ example: 1, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => EmployeeSlotSchedule)
  slot: EmployeeSlotSchedule;

  @ManyToMany(() => EmployeeWorkType)
  @JoinTable()
  employeeWorkType: EmployeeWorkType[];

  @ApiProperty({example: 'WAITING', description: 'Статус заявки'})
  @Column({
    type: 'enum',
    enum: WorkRequestStatus,
    default: WorkRequestStatus.WAITING
  })
  status: WorkRequestStatus;
}
