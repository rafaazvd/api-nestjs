import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from '../../users/dto/CreateUser.dto';

export class AuthDto {
  @ApiProperty()
  user: CreateUserDto;

  @ApiProperty()
  accessToken: string;

  constructor(user: CreateUserDto, accessToken: string) {
    this.user = user;
    this.accessToken = accessToken;
  }
}
