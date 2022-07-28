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

const likeMentor = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;
  let liked: boolean;
  try {
    const mentor = await MentorModel.findById(req.params.mentor_id);
    if (!mentor) return res.status(404).json({ message: 'Mentor not found' });

    if (user.liked_mentors.includes(mentor._id)) {
      user.liked_mentors = user.liked_mentors.filter(
        (id) => id.toString() !== mentor._id.toString(),
      );
      mentor.likes -= 1;
      liked = false;
    } else {
      user.liked_mentors.push(mentor._id);
      mentor.likes += 1;
      liked = true;
    }

    await Promise.all([user.save(), mentor.save()]);

    return res.status(200).json({ liked });
  } catch (err) {
    return res.status(404).json({ message: 'User not found' });
  }
};

const updateProfile = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;
  const { first_name, last_name } = req.body;

  if (first_name) user.first_name = first_name;
  if (last_name) user.last_name = last_name;

  await user.save();

  return res.status(200).json(user);
};

export default { changeMentoringStatus, likeMentor, updateProfile };
