import request from 'supertest';
import { app } from '../../src/app';
import { PingResponse } from '../../src/controllers/ping/ping.types';

describe('GET /ping', () => {
  it('should return 200 OK', async () => {
    const res = await request(app).get('/ping');
    expect(res.status).toEqual(200);
  });

  it('should contain a greeting, a date and an url in its response', async () => {
    const res = await request(app).get('/ping');
    const body = res.body as PingResponse;
    expect(typeof body.message).toBe('string');
    expect(typeof body.date).toBe('string');
    expect(body.url).toBe('/ping');
  });
});
