import { HelloService } from '@modules/Hello/hello.service';

describe('HelloService', () => {
  const service = new HelloService({ name: 'hello' });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should have a message method', () => {
    expect(service.message).toBeDefined();
  });

  it('should return hello message', () => {
    expect(
      service.message({
        name: 'Neith',
      }),
    ).toBe('Hello World, Neith');
  });
});
