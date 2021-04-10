import { BadRequestException, Body, Controller, Post } from '@nestjs/common';
import { ILoginRequest, IRegisterRequest } from 'src/interfaces/user.interface';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    private userService: UserService
  ) { }

  @Post('login')
  async login(
    @Body() body: ILoginRequest
  ) {
    console.log('ILoginRequest', body)
    const user = await this.userService.findOneByEmail(body.email);
    console.log('data', user);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    if (user.password !== body.password) {
      throw new BadRequestException('invalid credentials');
    }

    return { data: user };
  }

  @Post('register')
  async register(
    @Body() body: IRegisterRequest
  ) {
    console.log('IRegisterRequest', body)
    const user = await this.userService.createUser(body);
    console.log('new user', user.id);
    return { message: 'user created successfully' };
  }
}
