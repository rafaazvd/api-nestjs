import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { instanceToPlain, plainToInstance } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/CreateUser.dto';
import { User } from './entities/user.entity';
import { UserRepository } from './user.repository';
import { PostgresErrorCode } from 'src/infra/postgres-error-code';
import { AuthDto } from './dto/auth.dto';
import { SignInDto } from './dto/sign-in.dto';
import { UserResponseDto } from './dto/UserResponse.dto';

@Injectable()
export class UserService {
  constructor(
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async create(createUserDto: CreateUserDto): Promise<UserResponseDto> {
    const createUser = instanceToPlain(createUserDto);
    const user = plainToInstance(User, createUser);

    const saltRounds = 12;
    const salt = await bcrypt.genSalt(saltRounds);
    const hash = await bcrypt.hash(createUserDto.password, salt);

    user.password = hash;

    let userResult = null,
      exception = null;
    try {
      userResult = await this.userRepository.createUser(user);
    } catch (error: any) {
      console.log(error);
      if (error?.code === PostgresErrorCode.UniqueViolation) {
        let errorMessage = '';

        if (error?.detail?.indexOf('cpf') !== -1) {
          errorMessage = 'cpf já está sendo utilizado';
        }

        if (error?.detail?.indexOf('email') !== -1) {
          errorMessage = 'email já está sendo utilizado';
        }

        exception = new HttpException(errorMessage, HttpStatus.CONFLICT);
      } else {
        exception = new HttpException(
          'Internal server error',
          HttpStatus.INTERNAL_SERVER_ERROR,
        );
      }
    }

    if (exception) throw exception;

    const userLiteral = instanceToPlain(userResult);
    const userDto = plainToInstance(UserResponseDto, userLiteral, {
      excludeExtraneousValues: true,
    });

    return userDto;
  }

  async signIn(signInDto: SignInDto): Promise<AuthDto> {
    const { email, password } = signInDto;

    const userByEmail = await this.userRepository.findOneByEmail(email);

    const errorMessage = 'Email ou senha incorretos.';

    if (!userByEmail) {
      throw new UnauthorizedException(errorMessage);
    }

    const match = await bcrypt.compare(password, userByEmail?.password);

    if (!match) {
      throw new UnauthorizedException(errorMessage);
    }

    const usuarioLiteral = instanceToPlain(userByEmail);
    const usuarioDto = plainToInstance(User, usuarioLiteral, {
      excludeExtraneousValues: true,
    });

    const payload = {
      id: userByEmail.id,
      nome: userByEmail.name,
    };

    const accessToken = await this.jwtService.signAsync(payload);

    const authDto = new AuthDto(usuarioDto, accessToken);

    return authDto;
  }
}
