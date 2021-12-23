import { Injectable } from '@nestjs/common';
import { createRenderer } from 'vue-server-renderer';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

@Injectable()
export class RendererService {
  getRenderer() {
    const renderer = createRenderer();
    return renderer;
  }

  async renderToString(template: string, context?: any) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const Vue = require('vue');
    const vm = new Vue({ template, data: context ? context : {} });
    const renderer = this.getRenderer();
    return await renderer.renderToString(vm);
  }

  async renderFile(templateName: string, context?: any) {
    const path = join(
      __dirname,
      '..',
      '..',
      'views',
      `${templateName}.template.html`,
    );
    if (!existsSync(path)) {
      throw new Error(`Template ${templateName} not found`);
    }
    const template = readFileSync(path, 'utf8');
    return await this.renderToString(template, context);
  }
}
