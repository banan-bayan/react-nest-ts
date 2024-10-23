import { Column, Entity, PrimaryGeneratedColumn,  OneToMany} from 'typeorm';
import { User } from 'src/users/entities/users.entity';

@Entity({ name: 'roles', schema: 'user' })
export class Role {
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @Column({ type: 'varchar', unique: true })
  description: string;

  @OneToMany(() => User, user => user.roles)
    users: User[];
}
