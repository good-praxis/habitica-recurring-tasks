import { Test, TestingModule } from '@nestjs/testing';
import { RendererService } from './renderer.service';

describe('RendererService', () => {
  let service: RendererService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RendererService],
    }).compile();

    service = module.get<RendererService>(RendererService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return a Vue renderer Object', () => {
    expect(service.getRenderer()).toBeDefined();
    expect(service.getRenderer()).toBeInstanceOf(Object);
  });

  it('should render a provided template with a given context', async () => {
    const template =
      '<html><head><title>{{ title }}</title></head><body><div>Hello World</div></body></html>';
    const context = {
      title: 'Hello World',
    };
    const control =
      '<html data-server-rendered="true"><head><title>Hello World</title></head><body><div>Hello World</div></body></html>';
    const result = await service
      .renderToString(template, context)
      .catch((err) => err);
    expect(result).toBeDefined();
    expect(result).toBe(control);
  });

  it('should render and load the correct template', async () => {
    const templateName = 'test';
    const control = `<html data-server-rendered="true"><div>Congratulations!</div></html>`;
    const result = await service.renderFile(templateName);
    expect(result).toBeDefined();
    expect(result).toBe(control);
  });
});
