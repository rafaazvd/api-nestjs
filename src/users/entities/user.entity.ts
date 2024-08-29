import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  OneToMany,
} from 'typeorm';
import { ApiHideProperty } from '@nestjs/swagger';
import { Tutorial } from '../../tutorials/entities/tutorials.entity';

@Entity('user')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar', { length: 355, nullable: false })
  password: string;

  @Column('char', { length: 14, nullable: false, unique: true })
  cpf: string;

  @Column('varchar', { length: 255, nullable: false })
  name: string;

  @Column('varchar', { length: 255, nullable: false, unique: true })
  email: string;

  @CreateDateColumn({
    type: 'timestamp',
    precision: 0,
    default: () => 'CURRENT_TIMESTAMP',
  })
  @ApiHideProperty()
  createAt: Date;

  @OneToMany(() => Tutorial, (tutorial) => tutorial.user)
  tutorial: Tutorial[];

  constructor(user?: Partial<User>) {
    if (user) {
      this.id = user.id;
      this.cpf = user.cpf;
      this.name = user.name;
      this.email = user.email;
      this.password = user.password;
    }
  }
}
