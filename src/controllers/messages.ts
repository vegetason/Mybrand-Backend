import express from 'express';

import {getMessageById,getMessages,deleteMessageById,getContent,getEmail,SendMessage} from '../db/messages';
import { authentication, random } from '../helpers';

export const getAllMessages = async (req: express.Request, res: express.Response) => {
    try {
      const messages = await getMessages();
  
      return res.status(200).json(messages);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:"Error occured check your network"});
    }
  };

  export const deleteMessage = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const deletedMessage = await deleteMessageById(id);
  
      return res.json(deletedMessage);
    } catch (error) {
      console.log(error);
      return res.status(400).json({message:"message not deleted"});
    }
  }

  export const SendMessages = async (req: express.Request, res: express.Response) => {
    try {
      const { email,Content} = req.body;
  
      if (!email || !Content) {
        return res.status(400).json({message: "Please fill in all information"})
      }

      const user = await SendMessage({
        email,
        Content
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
