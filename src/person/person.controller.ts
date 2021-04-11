import { Controller, Get, UseGuards, Request } from "@nestjs/common";
import { JwtAuthGuard } from "src/auth/jwt.guard";

@Controller('person')
export class PersonController {
  constructor(

  ) { }

  @UseGuards(JwtAuthGuard)
  @Get('info')
  getInfo(@Request() req: any) {
    return req.user;
  }
}