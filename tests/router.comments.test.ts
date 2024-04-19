import express, { Router } from 'express';
import request from 'supertest';
import configureCommentRoutes from '../src/router/comments';
import * as commentsController from '../src/controllers/comments';
import * as middlewares from '../src/middlewares';

jest.mock('../controllers/comments');
jest.mock('../middlewares');

describe('configureCommentRoutes', () => {
  let router: Router;

  beforeEach(() => {
    router = express.Router();
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('GET /comments route should call getAllComments controller', () => {
    configureCommentRoutes(router);

    expect(router.get).toHaveBeenCalledWith('/comments', commentsController.getAllComments);
  });

  test('DELETE /deleteComment/:id route should call deleteComment controller with required middlewares', () => {
    configureCommentRoutes(router);

    expect(router.delete).toHaveBeenCalledWith(
      '/deleteComment/:id',
      middlewares.isAuthenticated,
      middlewares.isAdmin,
      commentsController.deleteComment
    );
  });

  test('POST /createComment route should call createComments controller with isAuthenticated middleware', () => {
    configureCommentRoutes(router);

    expect(router.post).toHaveBeenCalledWith(
      '/createComment',
      middlewares.isAuthenticated,
      commentsController.createComments
    );
  });
});
