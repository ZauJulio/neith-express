import { Request, Response } from 'express';

import { BaseController } from '@core';
import HelloService from './hello.service';

export class HelloController extends BaseController<HelloService> {
  helloWorld = async (req: Request, res: Response) => {
    const name = req.body.name;

    const message = this.service.message({ name });

    return res.status(200).send({ message });
  };
}

export default HelloController;
