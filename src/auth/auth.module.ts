import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { PassportModule } from '@nestjs/passport';
import { User } from 'src/entities/user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/app.constants';
import { UserService } from 'src/user/user.service';
import { LocalStrategy } from './local.strategy';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([User]),
    JwtModule.register({ signOptions: { algorithm: 'HS256' } }),
  ],
  providers: [AuthService, UserService, LocalStrategy],
  exports: [AuthService, JwtModule]
})
export class AuthModule { }