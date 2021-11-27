import { Request, Response } from 'express';
import { MentorModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import { isValidObjectId } from 'mongoose';

// http://localhost:5000/api/get-mentors?expertise=Leadership
export const getMentorsController = async (req: Request, res: Response) => {
  const expertise = req.query.expertise?.toString() || 'All';
  const topic: number = Number(req.query.topic?.toString() || -1);
  let mentors_;
  if (topic == -1 && expertise == 'All') mentors_ = await MentorModel.find({});
  else if (expertise == 'All')
    mentors_ = await MentorModel.find({ topics: topic });
  else if (topic == -1)
    mentors_ = await MentorModel.find({ expertise: expertise });
  else
    mentors_ = await MentorModel.find({ topics: topic })
      .where('expertise')
      .equals(expertise);

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
