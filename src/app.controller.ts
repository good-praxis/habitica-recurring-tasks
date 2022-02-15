import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    req.session.user = req.user;
    return req.user;
  }

  @Post('create')
  async create(@Body() data) {
    // TODO: validate data
    this.userService.create(data);
  }
}
