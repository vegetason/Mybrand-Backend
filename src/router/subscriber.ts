/**
 *  @openapi
 * tags:
 *   name: Subscribers
 *   description: The subscriber managing API 
 * /subscribe:
 *   get:
 *     summary: Lists all the blogs
 *     tags: [Subscribers]
 *     responses:
 *       200:
 *         description: All subscribers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       403:
 *         description: Error occured
 * /subscribe
 *   post:
 *     summary: Subscribe to the article
 *     tags: [subscribers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Subscribers'
 *     responses:
 *       200:
 *         description: Subscribe
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Subscriber'
 *       403:
 *         description: Error occured
 */ 


import express from 'express';

import { SubscribetoTheArticle,getAllSubscribers } from '../controllers/subscriber';

import { isAuthenticated, isOwner,isAdmin } from '../middlewares';

export default (router: express.Router) => {
  router.get('/subscribers',isAuthenticated,isAdmin,getAllSubscribers);
  router.post('/subscribe',SubscribetoTheArticle);
};