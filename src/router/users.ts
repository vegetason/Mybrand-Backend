/**
 *  @openapi
 * tags:
 *   name: Users
 *   description: The Users managing API 
 * /users:
 *   get:
 *     summary: Lists all the users
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: All users who signed up
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin privileges needed
 *   delete:
 *     summary: Remove a user by id
 *     tags: [Users]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The user id
 *     responses:
 *       200:
 *         description: The user has been removed
 *         content:
 *           application/json:
 *             schema:
 *                 $ref: '#/components/schemas/User'
 *       403:
 *         description: Admin Privileges needed or The user was not found
 */

import express from 'express';

import { getAllUsers, deleteUser, updateUser } from '../controllers/users';
import { isAuthenticated, isOwner,isAdmin } from '../middlewares';

export default (router: express.Router) => {
  router.get('/users',getAllUsers);
  
  router.delete('/users/:id',isAuthenticated,isOwner,deleteUser);
  router.patch('/users/:id',isOwner,isAuthenticated,updateUser);
};
