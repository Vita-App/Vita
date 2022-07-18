import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { MentorModel } from '../Models/User';
import { UserSchemaType } from '../types';

const changeMentoringStatus = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;
  const mentor = await MentorModel.findById(user.mentor_information);
  if (!mentor) return res.status(404).json({ message: 'User not found' });
  mentor.is_mentoring = !mentor.is_mentoring;
  await mentor.save();
  return res.status(200).json(user);
};

export default { changeMentoringStatus };
