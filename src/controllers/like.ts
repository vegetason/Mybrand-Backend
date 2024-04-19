import express from 'express';
import { blogModel } from '../db/blog';
import { UserModel } from '../db/users';
import {getBody,getComments,deleteComentById,createComment  } from '../db/comments';
import { getLikes,LikeBlog } from '../db/likes';
import { deleteLikeById } from '../db/likes';

export const getAllLikes= async (req: express.Request, res: express.Response) => {
    try {
      const Likes = await getLikes();
  
      return res.status(200).json(Likes);
    } catch (error) {
      console.log(error);
      return res.sendStatus(400);
    }
  };

  export const LikeABlog = async (req: express.Request, res: express.Response) => {
    try {
      const{userId}=req.params;
      const{blogid}=req.params;

      if (!blogid || !userId ) {
        return res.status(400).json({message: "Error Occured"})
      }

      const blog = await blogModel.findById(blogid);

      if (!blog) {
        return res.status(404).json({message: "no blog with that id"});
    }
    blog.likes.push({ user:userId});
    await blog.save();

    return res.status(200).json(blog.likes).end();
    } catch (error) {
      console.log(error);
      return res.status(400).json(error);
    }
    
  }
  export const deleteLike = async (req: express.Request, res: express.Response) => {
    try {
        const { id, likeId, userId } = req.params;

        const blog = await blogModel.findById(id);

        if (!blog) {
            return res.status(404).json({ message: "No blog found" });
        }

        // Check if the user has already liked the blog
        const hasLiked = blog.likes.some((like) => like._id.toString() === likeId && like.user.toString() === userId);

        if (!hasLiked) {
            return res.status(404).json({ message: "Like not found" });
        }
        const deletedLike = await deleteLikeById(likeId);

        // Filter out the like from the blog.likes array and cast the result
        delete blog.likes;

        await blog.save();

        // Delete the like from the database if needed
        

        return res.status(200).json({ message: "Like deleted successfully",  deletedLike});
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};