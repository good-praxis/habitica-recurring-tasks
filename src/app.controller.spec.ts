import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { RendererService } from './renderer/renderer.service';
import { UserService } from './user/user.service';

describe('AppController', () => {
  let appController: AppController;

  const mockRendererService = {
    renderFile: jest.fn((template, context) => {
      return `${template} ${context}`;
    }),
  };

  const mockUserService = {};

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [
        {
          provide: RendererService,
          useValue: mockRendererService,
        },
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    appController = app.get<AppController>(AppController);
  });

  it('should be defined', () => {
    expect(appController).toBeDefined;
  });

  it('should provide no params to the index page', () => {
    appController.root().then((result) => {
      expect(result).toBeDefined();
      expect(result).toEqual('index undefined');
    });
  });
});
