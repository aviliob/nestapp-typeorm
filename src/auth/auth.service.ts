import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { IJwtPayload } from 'src/interfaces/user.interface';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private configService: ConfigService
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

  getAccessToken(user: any) {
    const secret = this.configService.get('JWT_SECRET');
    return {
      access_token: this.jwtService.sign(user, { secret })
    };
  }

  decodeToken(token: string): IJwtPayload {
    return this.jwtService.decode(token) as IJwtPayload;
  }
}