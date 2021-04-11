import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtStrategy } from 'src/auth/jwt.strategy';
import { Person } from 'src/entities/person.entity';
import { PersonController } from './person.controller';
import { PersonService } from './person.service';

@Module({
  imports: [
    PassportModule,
    TypeOrmModule.forFeature([Person])
  ],
  controllers: [PersonController],
  providers: [PersonService, JwtStrategy],
  exports: [PersonService]
})
export class PersonModule { }