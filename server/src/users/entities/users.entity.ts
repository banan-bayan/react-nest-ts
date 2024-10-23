import { Column, Entity, PrimaryGeneratedColumn, ManyToMany, JoinTable, OneToMany } from 'typeorm';
import { Role } from 'src/roles/entities/roles.entity';
import { WorkRequest } from 'src/work-request/entities/work-request.entity';


@Entity({ name: 'users', schema: 'user' })
export class User {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  email: string;

  @Column({ type: 'varchar' })
  password: string;

  @Column({ type: 'varchar' })
  name: string;

  @ManyToMany(() => Role, { eager: true })
  @JoinTable({ name: 'user_roles' })
  roles: Role[];

  @OneToMany(() => WorkRequest, workRequest => workRequest.user)
    workRequest: WorkRequest[];
}
