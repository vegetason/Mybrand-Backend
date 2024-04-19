import express from 'express';
import { blogModel } from '../db/blog';

import { getImageUrl,createBlog,getTitle,getBody,getBlogs,deleteBlogById,updateBlogById, getBlogById } from '../db/blog';
import { authentication, random } from '../helpers';
import likes from 'router/likes';

export const getAllBlogs = async (req: express.Request, res: express.Response) => {
    try {
      const blogs = await blogModel.find({}).populate('comment.user').populate('likes.user');
  
      return res.status(200).json(blogs);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
    
  };

  export const deleteBlog = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
  
      const deletedBlog = await deleteBlogById(id);
  
      return res.json(deletedBlog);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }

  export const updateBlog = async (req: express.Request, res: express.Response) => {
    try {
      const { id } = req.params;
      const {body} = req.body;
      const{title}=req.body;
      const{imageUrl}=req.body
      if (!body) {
        return res.sendStatus(400);
      }

      if (!title) {
        return res.sendStatus(400);
      }
      if (!imageUrl) {
        return res.sendStatus(400);
      }
      const blog = await getBlogById(id);
      
      blog.body= body;
      blog.imageUrl=imageUrl;
      blog.title=title;
      await blog.save();
  
      return res.status(200).json(blog).end();
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  }
  export const createBlogs = async (req: express.Request, res: express.Response) => {
    try {
      const { title, body,imageUrl} = req.body;
  
      if (!title || !body || !imageUrl) {
        return res.status(400).json({message: "no body"})
      }

      const user = await createBlog({
        title,
        body,
        imageUrl
      });
  
      return res.status(200).json(user).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
  }
