/**
 *  @openapi
 * tags:
 *   name: Blogs
 *   description: The Blogs managing API 
 * /createComment/{blogid}/user/{userId}:
 *   post:
 *     summary: Creates a comment
 *     tags: [Comments]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: blog id
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: user id
 *     responses:
 *       200:
 *         description: The User created comment on the blog
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       403:
 *         description: user or blog not found
 * /comments:
 *   get:
 *     summary: Lists all the comments
 *     tags: [Comments]
 *     responses:
 *       200:
 *         description: All comments that were posted
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Comments'
 *       403:
 *         description: Admin privileges needed
 */

import express from 'express';

import {getAllComments,createComments,deleteComment} from '../controllers/comments';

import { isAuthenticated, isOwner,isAdmin } from '../middlewares';

const configureCommentRoutes=(router: express.Router) => {
  router.get('/comments',getAllComments);
  router.delete('/deleteComment/:id',isAuthenticated,isAdmin,deleteComment);
  router.post('/createComment/:blogid/user/:userId',createComments);
};
export default  configureCommentRoutes;