import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { Person } from 'src/entities/person.entity';
import { PersonService } from 'src/person/person.service';
import { User } from '../entities/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([User, Person]),
    AuthModule
  ],
  controllers: [UserController],
  providers: [
    UserService,
    PersonService,
  ],
  exports: [UserService]
})
export class UserModule { }