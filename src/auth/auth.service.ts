import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService
  ) { }

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new BadRequestException('invalid credentials');
    }

    // compare hash
    const match = await compare(pass, user.password);
    if (!match) {
      throw new BadRequestException('invalid credentials');
    }

    // quito password 
    const { password, ...cleanUser } = user;
    return cleanUser;
  }

  async getAccessToken(user: any) {
    return {
      access_token: this.jwtService.sign(user)
    };
  }
}