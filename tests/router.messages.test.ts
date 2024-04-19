import express, { Request, Response } from 'express';
import request from 'supertest';
import router from '../src/router'; // assuming this is your router setup file

describe('Router tests', () => {
  const app = express();
  app.use(express.json());
  router(app);

  it('should get all messages', async () => {
    const res = await request(app).get('/messages');
    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  it('should delete a message', async () => {
    const res = await request(app).delete('/deleteMessage/123'); // Replace '123' with a valid ID
    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  it('should create a message', async () => {
    const sampleMessage = { text: 'Test message' };
    const res = await request(app)
      .post('/createMessage')
      .send(sampleMessage);
    expect(res.status).toBe(200);
    // Add more assertions as needed
  });

  // Add more tests for other routes and scenarios
});
