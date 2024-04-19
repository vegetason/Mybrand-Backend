
import mongoose from 'mongoose';
import { title } from 'process';

// User Config
const MessageSchema = new mongoose.Schema({
  email: { type: String, required: true },
  Content: { type: String, required: true },
});

export const messageModel = mongoose.model('message', MessageSchema);

// Blogs
export const getMessages = () => messageModel.find();
export const getContent=(Content:string)=>messageModel.findOne({Content});
export const getEmail=(email:string)=>messageModel.findOne({email});
export const getMessageById = (id: string) => messageModel.findById(id);
export const SendMessage = (values: Record<string, any>) => new messageModel(values).save().then((message) => message.toObject());
export const deleteMessageById = (id: string) => messageModel.findOneAndDelete({ _id: id });
