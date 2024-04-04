
import mongoose from 'mongoose';
import { title } from 'process';

// User Config
const BlogSchema = new mongoose.Schema({
  imageUrl: { type: String, required: true },
  title: { type: String, required: true },
  body: { type: String, required: true },
});

export const blogModel = mongoose.model('Blog', BlogSchema);

// Blogs
export const getBlogs = () => blogModel.find();
export const getImageUrl = (imageUrl: string) => blogModel.findOne({ imageUrl });
export const getTitle=(title:string)=>blogModel.findOne({title});
export const getBody=(body:string)=>blogModel.findOne({body});
export const getBlogById = (id: string) => blogModel.findById(id);
export const createBlog = (values: Record<string, any>) => new blogModel(values).save().then((blog) => blog.toObject());
export const deleteBlogById = (id: string) => blogModel.findOneAndDelete({ _id: id });
export const updateBlogById = (id: string, values: Record<string, any>) => blogModel.findByIdAndUpdate(id, values);
