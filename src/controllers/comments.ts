import express from 'express';
import { blogModel } from '../db/blog';
import { UserModel } from '../db/users';
import {getBody,getComments,deleteComentById,createComment  } from '../db/comments';

export const getAllComments = async (req: express.Request, res: express.Response) => {
    try {
      const blogs = await getComments();
  
      return res.status(200).json(blogs);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const deleteComment = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const deletedComment = await deleteComentById(id);
  
      return res.json(deletedComment);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  export const createComments = async (req: express.Request, res: express.Response) => {
    try {
      const {text} = req.body;
      const{userId}=req.params;
      const{blogid}=req.params;

      if (!text || !blogid || !userId ) {
        return res.status(400).json({message: "User is not aunticated or no comment written"})
      }

      const blog = await blogModel.findById(blogid);

      if (!blog) {
        return res.status(404).json({message: "no blog with that id"});
    }
    blog.comment.push({ user:userId, text });
    await blog.save();

    return res.status(200).json(blog.comment).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
