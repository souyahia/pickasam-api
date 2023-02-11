import request from 'supertest';
import { app } from '../../src/app';
import { NotFoundResponse } from '../../src/controllers/not-found/not-found.types';

describe('URL Not found', () => {
  it('should return 404 Not Found', async () => {
    const res = await request(app).get('/fwewef');
    expect(res.status).toEqual(404);
  });

  it('should contain a message in its response', async () => {
    const res = await request(app).post('/dwdwnk');
    const body = res.body as NotFoundResponse;
    expect(typeof body.message).toBe('string');
  });
});
