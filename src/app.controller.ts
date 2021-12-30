import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { LocalAuthGuard } from './auth/local-auth.guard';
import { RendererService } from './renderer/renderer.service';
import { UserService } from './user/user.service';

@Controller()
export class AppController {
  constructor(
    private readonly rendererService: RendererService,
    private readonly userService: UserService,
  ) {}

  @Get()
  async root() {
    return await this.rendererService.renderFile('index');
  }

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Request() req) {
    return req.user;
  }

  @Post('create')
  async create(@Body() data) {
    this.userService.create(data);
  }
}
