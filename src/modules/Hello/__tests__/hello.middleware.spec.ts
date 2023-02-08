/* eslint-disable @typescript-eslint/no-empty-function */
import { Request, Response, NextFunction } from 'express';
import HelloMiddleware from '../hello.middleware';

const handlers = new HelloMiddleware({
  name: 'hello',
});

const mockResponse = (function () {
  const res = {} as any;

  res.status = jest.fn().mockReturnValue(res);
  res.send = jest.fn().mockReturnValue(res);

  return res;
})();

describe('HelloMiddleware', () => {
  const nextFunction: NextFunction = jest.fn();

  it('should be defined', () => {
    expect(handlers.validateBodyFields).toBeDefined();
  });

  it('should validate name field', async () => {
    await handlers.validateBodyFields(
      { body: {} } as Request,
      mockResponse as Response,
      nextFunction,
    );

    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith({
      error: 'Missing Password Field',
    });
  });
});
