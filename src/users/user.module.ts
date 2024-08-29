import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { AuthGuard } from './auth.guard';
import { JwtModule } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        global: true,
        secret: `${configService.getOrThrow('JWT_SECRET')}`,
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN')
            ? `${configService.get('JWT_EXPIRES_IN')}`
            : '1h',
        },
      }),
    }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    UserRepository,
    {
      provide: APP_GUARD,
      useExisting: AuthGuard,
    },
    AuthGuard,
  ],
  exports: [],
})
export class UsersModule {}
