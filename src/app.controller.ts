import { Controller, Get, Render } from '@nestjs/common';
import { RendererService } from './renderer/renderer.service';

@Controller()
export class AppController {
  constructor(private readonly rendererService: RendererService) {}

  @Get()
  async root() {
    return await this.rendererService.renderFile('index');
  }
}
