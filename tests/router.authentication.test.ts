import { test, it, describe, expect, beforeAll, afterAll, jest } from '@jest/globals';
import superTest, { Request, Response } from 'supertest';
import mongoose from 'mongoose';
import app from '../src/index';
import fs from 'fs';
import FormData from 'form-data';
import path from 'path'

console.log('__dirname:', __dirname);

const MONGO_URL='mongodb+srv://irakozepirlo:u6jgO8F5zGlc0vRw@cluster0.u7uvxps.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const token: { token: string } = { token: '' };
const token2: { token2: string } = { token2: '' };
const  blogId: {blogID: string } = {blogID: ''};
const msgId: {msgId: string} = { msgId: ''}; 
const subId: {subId: string} = { subId: ''};

beforeAll(async () => {
  await mongoose.disconnect();
  await mongoose.connect(MONGO_URL);
  await mongoose.connection.db.dropDatabase();
}, 50000);

afterAll(async () => {
  await mongoose.connection.close();
});

describe("endpoints", () => {
  it('should return 404', async () => {
    const response = await superTest(app)
    .get('/*');
    expect(response.statusCode).toBe(404);
  });
  
  it('should give 201 for account creation', async () => {
    const response = await superTest(app)
      .post('/auth/register')
      .send({
        username: 'Musabe',
        password: 'musabe123',
        email: 'musabe@gmail.com',
      });
    expect(response.statusCode).toBe(200);
  });
  
 
  it('Logging in', async () => {
    const response = await superTest(app)
      .post('/auth/login')
      .send({
        username: 'Musabe',
        password: 'musabe123'
      });
    token2.token2 = response.body.token;
    expect(response.statusCode).toBe(200);
  });
 
  it('should give 404 for already saveds', async () => {
    const response = await superTest(app)
      .post('/auth/register')
      .send({
        username: 'Musabe',
        password: 'musabe123',
        email: 'musabe@gmail.com',
      });
    expect(response.statusCode).toBe(400);
  });
  
  it('creating  admin', async () => {
    const response = await superTest(app)
      .post('/auth/register')
      .send({
        username: 'shebelle',
        email:'shebelle@gmail.com',
        password: 'shebelle123',
        role: 'admin'
      });
    token.token = response.body.token;
    expect(response.body).toHaveProperty('message', 'User created successfully');
    expect(response.body).toHaveProperty('token');
    expect(typeof response.body.token).toBe('string');
  });
  

  it('Logging in', async () => {
    const response = await superTest(app)
      .post('/login')
      .send({
        username: 'shebelle',
        password: 'shebelle123',
      });
    token.token = response.body.token;
    expect(response.statusCode).toBe(200);
  });
  
  it('Logging in validation error', async () => {
    const response = await superTest(app)
      .post('/login')
      .send({
        username: 's',
        password: 'shebelle123'
      });
    expect(response.statusCode).toBe(401);
  });
    it('Logging in doesnot exist', async () => {
    const response = await superTest(app)
      .post('/login')
      .send({
        username: 'Doesnotexist',
        password: 'passwordnot',
      });
    expect(response.statusCode).toBe(401);
  });


});