import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";
import { RoleEnum, Roles } from "../role/role.decorator";

@Controller('person')
export class PersonController {
  constructor(

  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  @Roles(RoleEnum.User)
  getInfo(@Request() req: any) {
    return req.user;
  }
}