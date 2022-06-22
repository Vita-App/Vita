import { Request, Response } from 'express';
import { MentorModel, UserModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import { Document, FilterQuery, isValidObjectId } from 'mongoose';
import { MentorSchemaType } from '../types';

// http://localhost:5000/api/get-mentors?expertise=Leadership&topic=1&limit=10&mentorSearchText=Google
export const getMentorsController = async (req: Request, res: Response) => {
  const expertise = req.query.expertise?.toString() || 'All';
  const topic = Number(req.query.topic?.toString() || -1);
  const mentorSearchText = req.query.mentorSearchText?.toString() || '';
  //  A limit() value of 0 is equivalent to setting no limit.
  const limit = Number(req.query.limit?.toString() || '0');

  const searchOptions = {} as FilterQuery<MentorSchemaType>;
  if (topic !== -1) searchOptions.topics = topic;
  if (expertise !== 'All') searchOptions.expertise = expertise;
  if (mentorSearchText !== '')
    searchOptions.$text = { $search: mentorSearchText };

  let mentors = [] as Partial<MentorSchemaType>[];
  // Since we are using user input we need need to handle when user sends wrong data
  try {
    const mentors_ = await MentorModel.find(searchOptions).limit(limit);
    mentors = mentors_.map(
      ({
        _id,
        first_name,
        last_name,
        expertise,
        experiences,
        avatar,
        topics,
      }) => ({
        _id,
        first_name,
        expertise,
        last_name,
        experiences,
        avatar,
        topics,
      }),
    );
  } catch (error) {
    mentors = [];
  }

  res.json(mentors);
};

// http://localhost:5000/api/get-topics?textSearch=a
export const getTopicsController = async (req: Request, res: Response) => {
  const searchString = req.query.textSearch?.toString() || '';
  let topics;
  if (searchString)
    topics = await TopicModel.find({ $text: { $search: searchString } });

  res.json(topics);
};

// http://localhost:5000/api/get-mentor?id=61a211ab8e41a1fc1c49c2a4
export const getMentorController = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || '';
  let mentor;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);
  res.json(mentor);
};

// http://localhost:5000/api/get-users
export const getUsersController = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.json(users);
};

// http://localhost:5000/api/get-user?id=61a211ab8e41a1fc1c49c2a4
export const getUserController = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || '';
  let user;
  if (id && isValidObjectId(id)) user = await UserModel.findById(id);
  res.json(user);
};

export const approveMentorController = async (req: Request, res: Response) => {
  const { id } = req.body;

  let mentor: (Document & MentorSchemaType) | null = null;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);

  if (!mentor) {
    return res.status(401).json({
      error: 'Mentor Not Found',
    });
  }

  mentor.approved = true;

  await mentor.save();
  return res.status(200).json({
    success: true,
    message: 'Mentor Approved!',
  });
};
