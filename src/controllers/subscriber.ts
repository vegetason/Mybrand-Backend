import express from 'express';

import { authentication, random } from '../helpers';
import { getSubscribers,Subscribe } from '../db/subscriber';

export const getAllSubscribers= async (req: express.Request, res: express.Response) => {
    try {
      const subscribers = await getSubscribers();
  
      return res.status(200).json(subscribers);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:"Error occured check your network"});
    }
  };

  export const SubscribetoTheArticle= async (req: express.Request, res: express.Response) => {
    try {
      const {email} = req.body;
  
      if (!email) {
        return res.status(400).json({message: "Please fill in all information"})
      }

      const subscription = await Subscribe({
        email,
      });
  
      return res.status(200).json({message:"susbscripton successful"}).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
