import express from 'express';

import { SubscribetoTheArticle,getAllSubscribers } from '../controllers/subscriber';

import { isAuthenticated, isOwner,isAdmin } from '../middlewares';

export default (router: express.Router) => {
  router.get('/subscribers',getAllSubscribers);
  router.post('/subscribe',SubscribetoTheArticle);
};