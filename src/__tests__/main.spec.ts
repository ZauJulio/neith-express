import { default as request } from 'supertest';

import { bootstrap } from '../main';

describe('App', () => {
  const app = bootstrap().app;

  it('should run', async () => {
    return await request(app).get('/').expect(200);
  });

  it('should have a /hello endpoint', (done) => {
    request(app).post('/hello').expect(400, done);
  });

  it('should have a /docs endpoint', async () => {
    await request(app).patch('/docs').expect(200);
  });

  it('should be send hello', async () => {
    const res = await request(app).post('/hello').send({
      name: 'Neith',
    });

    expect(res.body).toEqual({ message: 'Hello World, Neith' });
  });
});
