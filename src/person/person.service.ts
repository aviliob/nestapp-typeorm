import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Person } from "src/entities/person.entity";
import { PersonDto } from "src/dto/person.dto";

@Injectable()
export class PersonService {
  constructor(
    @InjectRepository(Person)
    private personRepo: Repository<Person>
  ) { }

  // findOneById(id: number): Promise<any> {
  //   return this.personRepo.findOne(id);
  // }

  // findOneByEmail(email: string): Promise<Person> {
  //   return this.personRepo.findOne({ where: { email } });
  // }

  createPerson(dto: PersonDto): Promise<Person> {
    const person = this.personRepo.create(dto);
    return this.personRepo.save(person);
  }
}