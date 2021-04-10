import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entities/user.entity";
import { Repository } from "typeorm";
import { UserDto } from "src/dto/user.dto";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>
  ) { }

  findOneById(id: number): Promise<any> {
    return this.userRepo.findOne(id);
  }

  findOneByEmail(email: string): Promise<User> {
    return this.userRepo.findOne({ where: { email } });
  }

  createUser(dto: UserDto): Promise<User> {
    const user = this.userRepo.create(dto);
    return this.userRepo.save(user);
  }
}