import { DataSource, Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/CreateUser.dto';

@Injectable()
export class UserRepository extends Repository<User> {
  constructor(dataSource: DataSource) {
    super(User, dataSource.createEntityManager());
  }

  async createUser(user: CreateUserDto) {
    const userResult = await this.save(user);
    return userResult;
  }

  async findOneByEmail(email: string) {
    const query = this.createQueryBuilder('u')
      .select(['u.id', 'u.email', 'u.cpf', 'u.name', 'u.password'])
      .where('u.email = :email', { email: email });

    return query.getOne();
  }
}
