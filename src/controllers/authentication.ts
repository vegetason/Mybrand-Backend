import express from 'express';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { getUserByEmail, createUser } from '../db/users';
import { authentication, random } from '../helpers';

export const login = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.sendStatus(400);
    }

    const user = await getUserByEmail(email);

    if (!user) {
      return res.status(400).json({message:"Can not find User"});
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    
    if (!isValidPassword){
      return res.status(403).json({message: "invalid email or password"});
  }

  const token = jwt.sign({userId: user._id}, 'Mysecret');
  res.cookie('myToken', token, {httpOnly: true});
  await user.save();
  res.status(201)
  .header('Authorization', `Bearer ${token}`)
  .send({ message: 'User logged in  successfully', token, user });
  } catch (error) {
    console.log(error);
    return res.sendStatus(400);
  }
};

export const register = async (req: express.Request, res: express.Response) => {
  try {
    const { email, password, username } = req.body;

    if (!email || !password || !username) {
      return res.status(400).json({message: "no body"})
    }

    const existingUser = await getUserByEmail(email);
  
    if (existingUser) {
      return res.status(400).json({message: "the email is already used"});
    }

    const hashPassword=await bcrypt.hash(password,10)
    const user= await createUser({
      email,
      username,
      password:hashPassword,
    })

    return res.status(200).json(user).end();
  } catch (error) {
    console.log(error);
    return res.status(400).json(error);
  }
}