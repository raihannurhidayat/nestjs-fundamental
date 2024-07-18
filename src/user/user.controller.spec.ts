import { Test, TestingModule } from '@nestjs/testing';
import { UserController } from './user.controller';
import * as httpMock from 'node-mocks-http';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      imports: [],
      providers: [UserService],
    }).compile();

    controller = module.get<UserController>(UserController);
  });

  it("should ca be sayHello", () => {
    const response = controller.sayHelloService("raihan")
    expect(response).toBe("Hallo raihan")
  })

  it('should can say hello', async () => {
    const response = await controller.sayHello('raihan', 12);
    expect(response).toBe('Hello raihan yang umur nya 12');
  });

  it('Should can say hallo', () => {
    expect(controller.sayCoba()).toBe('hallo');
  });

  it('should response view', () => {
    const response = httpMock.createResponse();
    controller.viewHello('raihan', response);

    expect(response._getRenderView()).toBe('index.html');
    expect(response._getRenderData()).toEqual({
      nama: 'raihan',
    });
  });
});
