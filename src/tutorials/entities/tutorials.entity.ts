import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity('tutorial')
export class Tutorial {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  title: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('text', { nullable: false })
  content: string;

  @Column('varchar', { length: 255, nullable: false })
  author: string;

  @Column('varchar', { length: 20, default: 'draft' })
  status: string;

  @Column('simple-array', { nullable: true })
  tags: string[];

  @Column('int', { default: 0, nullable: true })
  views: number;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdAt: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt: Date;

  @ManyToOne(() => User, (user) => user.tutorial)
  @JoinColumn({
    name: 'userId',
    referencedColumnName: 'id',
  })
  user: User;
}
