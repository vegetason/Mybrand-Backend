import express from 'express';
import { merge, get } from 'lodash';

import { getUserBySessionToken } from '../db/users'; 

export const isAuthenticated = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['ANTONIO-AUTH'];
    console.log(sessionToken)
    if (!sessionToken) {
      return res.status(403).json({message: "invalid token"});
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    console.log(existingUser)
    if (!existingUser) {
      return res.status(403).json({message: "login required"});
    }

    merge(req, { identity: existingUser });

    return next();
  } catch (error) {
    //console.log(error);
    return res.status(400).json(error);
  }
}

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const { id } = req.params;
    const currentUserId = get(req, 'identity._id') as string;

    if (!currentUserId) {
      return res.status(400).json({message: "no UserId"});
    }

    if (currentUserId.toString() !== id) {
      return res.sendStatus(403);
    }

    next();
  } catch (error) {
   // console.log(error);
    return res.status(400).json(error);
  }
}


export const isAdmin = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
  try {
    const sessionToken = req.cookies['ANTONIO-AUTH'];

    if (!sessionToken) {
      return res.status(403).json({message:"no user "});
    }

    const existingUser = await getUserBySessionToken(sessionToken);
    if (!existingUser) {
      console.log(existingUser)
      return res.status(403).json({message:"user not autenticated"});
    }

    return next();
  } catch (error) {
   // console.log(error);
    return res.status(400).json({message:"Error detected"});
  }
}