import { Application } from 'express';
import request from 'supertest';
import createServer from '../src/server';

let server: Application;

beforeAll(async () => {
  server = await createServer();
});

const mockResult = {
  message: 'Pet Finder 2000 API',
  status: 'success',
};

describe('api entry point', () => {
  it('/apireturns proper values', async () => {
    const result = await request(server).get('/api');
    expect(result.body).toEqual(mockResult);
  });
});
