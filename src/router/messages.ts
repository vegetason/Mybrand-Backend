/**
 *  @openapi
 * tags:
 *   name: Messages
 *   description: The Messages managing API 
 * /messages:
 *   get:
 *     summary: Lists all the messages sent
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: All messages that have been sent
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       403:
 *         description: Admin privileges needed
 * /createMessage:
 *   post:
 *     summary: Creates a message
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Message'
 *     responses:
 *       200:
 *         description: The created Message
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Message'
 *       403:
 *         description: Something went wrong
 */
import express from 'express';

import { getAllMessages,deleteMessage,SendMessages} from '../controllers/messages';

import { isAuthenticated,isAdmin } from '../middlewares';

export default (router: express.Router) => {
  router.get('/messages',getAllMessages);
  router.delete('/deleteMessage/:id',isAdmin,deleteMessage);
  router.post('/createMessage',SendMessages);
};