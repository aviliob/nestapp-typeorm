import { BadRequestException, Body, Controller, Post, UseGuards, Request, Logger } from '@nestjs/common';
import { UserDto } from '../dto/user.dto';
import { ILoginRequest, IRegisterRequest } from '../interfaces/user.interface';
import { PersonService } from '../person/person.service';
import { UserService } from './user.service';
import { hash } from 'bcrypt';
import { defaultSaltOrRounds } from '../app.constants';
import { AuthService } from 'src/auth/auth.service';
import { LocalAuthGuard } from 'src/auth/local-auth.guard';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService,
    private personService: PersonService,
    private authService: AuthService,
  ) { }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req: any) {
    const user = req.user as ILoginRequest;
    const auth = await this.authService.getAccessToken(user);

    return { data: user, access_token: auth.access_token };
  }

  @Post('register')
  async register(
    @Body() body: IRegisterRequest
  ) {
    // primero, creamos person, necesitamos recibir los datos de person dto
    if (!body || !body.person) {
      throw new BadRequestException('bad request');
    }
    const person = await this.personService.createPerson(body.person);

    // aqui preparamos el dto para crear el usuario
    const userDto: UserDto = body as any; // TODO: buscar una forma mas fancy de hacer esto luego
    userDto.idPerson = person.id

    // hacer hash de clave
    userDto.password = await hash(userDto.password, defaultSaltOrRounds);
    const user = await this.userService.createUser(userDto);

    console.log('new user', user.id);
    return { message: 'user created successfully' };
  }
}
