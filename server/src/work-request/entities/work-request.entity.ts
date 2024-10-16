import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User  } from 'src/users/entities/users.entity';
import { EmployeeSlotSchedule  } from 'src/employee-slot-schedule/employee-slot-schedule.model';
import { EmployeeWorkType   } from 'src/employee-work-type/employee-work-type.model';

export enum WorkRequestStatus {
  WAITING = 'WAITING',
  DONE = 'DONE',
  CANCELED = 'CANCELED',
  DONE_NONPAID = 'DONE_NONPAID'
}

@Entity({ name: 'work_requests', schema: 'user' })
export class WorkRequest {

  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => EmployeeSlotSchedule)
  slot: EmployeeSlotSchedule;

  @ManyToMany(() => EmployeeWorkType)
  @JoinTable()
  employeeWorkType: EmployeeWorkType[];

  @Column({
    type: 'enum',
    enum: WorkRequestStatus,
    default: WorkRequestStatus.WAITING
  })
  status: WorkRequestStatus;
}
