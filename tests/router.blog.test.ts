import request from 'supertest';
import express, { Request, Response } from 'express';
import bodyParser from 'body-parser';
import routes from '../src/router/blog';
import app from '../src/index';


app.use(bodyParser.json());
routes(app);

describe('Blog API endpoints', () => {
  it('should get all blogs', async () => {
    const response = await request(app).get('/blogs');
    expect(response.status).toBe(200);
    expect(Array.isArray(response.body)).toBe(true);
  });

  it('should create a blog', async () => {
    const newBlog = {
      // fill in with required fields for a new blog
    };
    const response = await request(app)
      .post('/createBlog')
      .send(newBlog);
    expect(response.status).toBe(200);
    // additional assertions based on your expected response schema
  });

  it('should update a blog', async () => {
    const blogId = 'exampleBlogId'; // use an actual blog ID from your database
    const updatedBlog = {
      // fill in with fields to update
    };
    const response = await request(app)
      .patch(`/updateBlog/${blogId}`)
      .send(updatedBlog);
    expect(response.status).toBe(200);
    // additional assertions based on your expected response schema
  });

  it('should delete a blog', async () => {
    const blogId = 'exampleBlogId'; // use an actual blog ID from your database
    const response = await request(app).delete(`/deleteBlog/${blogId}`);
    expect(response.status).toBe(200);
    // additional assertions based on your expected response schema
  });
});
