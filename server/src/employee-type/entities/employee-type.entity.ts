import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToOne, JoinColumn} from 'typeorm';
import { EmployeeWorkType } from 'src/employee-work-type/entities/employee-work-type.entity';
import { Employee } from 'src/employee/entities/employee.entity';

@Entity({ name: 'employee_types', schema: 'employee' })
export class EmployeeType {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  title: string;

  @ManyToOne(() => EmployeeWorkType, employeeWorkType => employeeWorkType.employeeType, { nullable: true })
  @JoinColumn({ name: 'workTypeId' })
  employeeWorkType: EmployeeWorkType;

  @OneToMany(() => Employee, employee => employee.type, { onDelete: 'CASCADE' })
    employee: Employee[];
}
