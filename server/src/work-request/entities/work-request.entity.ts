import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, ManyToMany, JoinTable } from 'typeorm';
import { User  } from 'src/users/entities/users.entity';
import { EmployeeSlotSchedule  } from 'src/employee-slot-schedule/entities/employee-slot-schedule.entity';
import { EmployeeWorkType   } from 'src/employee-work-type/entities/employee-work-type.entity';
import { WorkRequestStatus } from 'src/Types';

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

  @Column({ type: 'enum', enum: WorkRequestStatus, default: WorkRequestStatus.WAITING })
  status: WorkRequestStatus;
}
