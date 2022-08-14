import { Request, Response } from 'express';
import { Document } from 'mongoose';
import { cloudinary } from '../config/cloudinary';
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

  try {
    await user.updateOne(req.body);
    await MentorModel.findByIdAndUpdate(user.mentor_information, req.body);
  } catch (err) {
    return res.status(400).json({ message: 'Invalid Data Provided' });
  }

  return res.status(200).json(req.body);
};

const updateProfilePic = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;
  const mentor = await MentorModel.findById(user.mentor_information);

  const prevProfilePic = user.avatar?.filename;

  if (req.file) {
    user.avatar = {
      url: req.file?.path || user.avatar?.url,
      filename: req.file?.filename || user.avatar?.filename,
    };

    if (mentor) mentor.avatar = user.avatar;
  }

  const allPromises = [user.save(), mentor?.save()];

  // Delete old profile pic
  if (prevProfilePic && prevProfilePic !== 'default')
    allPromises.push(cloudinary.uploader.destroy(prevProfilePic));

  await Promise.all(allPromises);

  return res.status(200).json({
    url: user.avatar.url,
    filename: user.avatar.filename,
  });
};

const updateMentorSlots = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;

  const mentor = await MentorModel.findById(user.mentor_information);

  if (!mentor) return res.status(404).json({ message: 'User not found' });

  mentor.time_slots = req.body;

  await mentor.save();

  return res.status(200).json({ success: true });
};

export default {
  changeMentoringStatus,
  likeMentor,
  updateProfile,
  updateProfilePic,
  updateMentorSlots,
};
