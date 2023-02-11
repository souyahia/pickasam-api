import request from 'supertest';
import { app } from '../../src/app';
import {
  CustomHelloRequestBody,
  HelloLang,
  HelloResponse,
} from '../../src/controllers/hello/hello.types';

describe('Hello Controller', () => {
  describe('GET /hello', () => {
    it('should return 200 OK', async () => {
      const res = await request(app).get('/hello');
      expect(res.status).toEqual(200);
    });

    it('should contain a message and a date', async () => {
      const res = await request(app).get('/hello');
      const body = res.body as HelloResponse;
      expect(typeof body.message).toBe('string');
      expect(typeof body.date).toBe('string');
    });
  });

  describe('POST /hello/:name', () => {
    it('should return 200 OK', async () => {
      const name = 'Samy';
      const helloRequest: CustomHelloRequestBody = {
        lang: HelloLang.ENGLISH,
      };
      const res = await request(app).post(`/hello/${name}`).send(helloRequest);
      expect(res.status).toEqual(200);
    });

    it('should contain a message with the given name in it', async () => {
      const name = 'Samy';
      const helloRequest: CustomHelloRequestBody = {
        lang: HelloLang.ENGLISH,
      };
      const res = await request(app).post(`/hello/${name}`).send(helloRequest);
      const body = res.body as HelloResponse;
      expect(body.message).toContain(name);
      expect(body.date).toBeUndefined();
    });

    it('should contain a date if withDate is true', async () => {
      const name = 'Samy';
      const helloRequest: CustomHelloRequestBody = {
        lang: HelloLang.ENGLISH,
        withDate: true,
      };
      const res = await request(app).post(`/hello/${name}`).send(helloRequest);
      const body = res.body as HelloResponse;
      expect(body.message).toContain(name);
      expect(typeof body.date).toBe('string');
    });
  });
});
