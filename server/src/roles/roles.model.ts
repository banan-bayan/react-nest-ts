import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'roles' })
export class Role {
  @ApiProperty({ example: 1, description: 'id' })
  @PrimaryGeneratedColumn({ type: 'int' })
  id: number;

  @ApiProperty({ example: 'ADMIN', description: 'Права пользователя' })
  @Column({ type: 'varchar', unique: true })
  value: string;

  @ApiProperty({ example: 'Администратор', description: 'Описание роли' })
  @Column({ type: 'varchar' })
  description: string;
}
