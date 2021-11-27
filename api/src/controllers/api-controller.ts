import { CLIENT_URL } from '../config/keys';
import { Request, Response } from 'express';
import passport from 'passport';
import { UserModel, MentorModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import { MentorSchemaType } from '../types';

// http://localhost:5000/api/get-mentors?expertise=Leadership
export const mentorController = async (req: Request, res: Response) => {
  const expertise = req.query.expertise?.toString();
  const searchString = req.query.textSearch?.toString() || 'Uber';
  console.log(expertise);
  let mentors_ = await MentorModel.find({ expertise: expertise });
  if (searchString)
    mentors_ = await MentorModel.find({ $text: { $search: searchString } });

  const mentors = mentors_.map(
    ({
      _id,
      first_name,
      last_name,
      company,
      job_title,
      expertise,
      image_link,
      topics,
    }) => {
      return {
        _id,
        first_name,
        last_name,
        company,
        job_title,
        expertise,
        image_link,
        topics,
      };
    },
  );

  res.json(mentors.length);
};

// http://localhost:5000/api/get-topics?textSearch=a
export const topicController = async (req: Request, res: Response) => {
  const searchString = req.query.textSearch?.toString() || '';
  let topics;
  if (searchString)
    topics = await TopicModel.find({ $text: { $search: searchString } });

  res.json(topics);
};

// http://localhost:5000/api/get-mentor?id=61a211ab8e41a1fc1c49c2a4
export const singleMentorController = async (req: Request, res: Response) => {
  const id = req.query.id?.toString();
  const mentor = await MentorModel.findById(id);
  res.json(mentor);
};
