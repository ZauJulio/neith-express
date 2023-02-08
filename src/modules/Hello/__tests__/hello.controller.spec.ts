/* eslint-disable @typescript-eslint/no-empty-function */
import { HelloController } from '../hello.controller';
import { HelloService } from '../hello.service';

const controller = new HelloController({
  name: 'hello-mock',
  service: {
    message: ({ name }) => 'Hello World, ' + name,
    log: {} as any,
  } as HelloService,
});

describe('HelloController', () => {
  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should have a message method', () => {
    expect(controller.helloWorld).toBeDefined();
  });

  it('should call the service message method', () => {
    const spy = jest.spyOn(controller.service, 'message');

    const res = { status: () => ({ json: () => {}, send: () => {} }) };
    const body = { name: 'Neith' };

    controller.helloWorld({ body } as any, res as any);

    expect(spy).toHaveBeenCalledWith(body);
  });
});
