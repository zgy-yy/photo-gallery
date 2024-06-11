import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  ManyToOne,
} from 'typeorm';
import { Role } from './role.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  userName: string;

  @Column({ length: 100 })
  password: string;

  @Column({ unique: true, length: 255 })
  email: string;

  @CreateDateColumn()
  registrationDate: Date;

  @Column({ nullable: true })
  avatarURL: string;

  @ManyToOne(()=>Role,(role)=>role.users)
  role:Role
}