
import mongoose from 'mongoose';
import { title } from 'process';
import { isArrayLike } from 'lodash';

const subscriberSchema= new mongoose.Schema({
  email: { type: String, required: true },
});

export const subscriberModel = mongoose.model('subscriber', subscriberSchema);


export const getSubscribers = () => subscriberModel.find();
export const getEmail = (email: string) => subscriberModel.findOne({ email });
export const Subscribe = (values: Record<string, any>) => new subscriberModel(values).save().then((subscriber) => subscriber.toObject());
