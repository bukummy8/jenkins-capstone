const request = require('supertest');
const app = require('../src/server');

describe('Jenkins DevOps Capstone API', () => {
  test('GET / should return application information', async () => {
    const response = await request(app).get('/');

    expect(response.statusCode).toBe(200);
    expect(response.body.application).toBe('Jenkins DevOps Capstone');
    expect(response.body.message).toBe('Application is running');
  });

  test('GET /health should return healthy status', async () => {
    const response = await request(app).get('/health');

    expect(response.statusCode).toBe(200);
    expect(response.body.status).toBe('ok');
  });

  test('GET /api/info should return application information', async () => {
    const response = await request(app).get('/api/info');

    expect(response.statusCode).toBe(200);
    expect(response.body.application).toBe('Jenkins DevOps Capstone');
  });
});