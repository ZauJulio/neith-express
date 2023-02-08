import { Server } from 'http';

import HelloController from './hello.controller';
import HelloMiddleware from './hello.middleware';
import HelloService from './hello.service';

import { BaseModule } from '@core';

export class HelloModule extends BaseModule<
  HelloMiddleware,
  HelloController,
  HelloService
> {
  async routes() {
    this.router.post(
      '/',
      this.middleware.validateBodyFields,
      this.controller.helloWorld,
    );
  }
}

export default function Module(server: Server) {
  const _module = new HelloModule({
    server,
    name: 'hello',
    service: HelloService,
    middleware: HelloMiddleware,
    controller: HelloController,
  });

  return _module;
}
