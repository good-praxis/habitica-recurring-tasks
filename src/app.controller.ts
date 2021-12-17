import { Body, Controller, Get, Post, Render } from '@nestjs/common';

@Controller()
export class AppController {
  @Get()
  @Render('index')
  root() {
    return { message: 'Hello world!' };
  }

  @Post()
  @Render('index')
  loginRequested(@Body() body: any) {
    return { message: 'Login requested!' };
  }
}
