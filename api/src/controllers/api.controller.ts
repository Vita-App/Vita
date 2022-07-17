import { Request, Response } from 'express';
import { MentorModel, UserModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import { FilterQuery, isValidObjectId } from 'mongoose';
import { MentorSchemaType } from '../types';
import { BannerModel } from '../Models/Banner';

// curl -X GET http://localhost:5000/api/get-mentors?expertise=Leadership&topic=1&limit=10&page=1&mentorSearchText=Google
const getMentors = async (req: Request, res: Response) => {
  const page = Number(req.query.page || '1');
  let totalPages = 0;
  let nextPage: number | null = null;
  let prevPage: number | null = null;
  const expertise = req.query.expertise?.toString() || 'All';
  const topic = Number(req.query.topic?.toString() || -1);
  const mentorSearchText = req.query.mentorSearchText?.toString() || '';
  //  A limit() value of 0 is equivalent to setting no limit.
  const limit = Number(req.query.limit) === 0 ? 15 : Number(req.query.limit);

  const searchOptions = {} as FilterQuery<MentorSchemaType>;
  searchOptions.approved = true;
  if (topic !== -1) searchOptions.topics = topic;
  if (expertise !== 'All') searchOptions.expertise = expertise;
  if (mentorSearchText !== '')
    searchOptions.$text = { $search: mentorSearchText };

  let mentors = [] as Partial<MentorSchemaType>[];
  // Since we are using user input we need need to handle when user sends wrong data
  try {
    const [mentors_, totalDocs] = await Promise.all([
      MentorModel.find(searchOptions)
        .skip(limit * (page - 1))
        .limit(limit),
      MentorModel.countDocuments(searchOptions),
    ]);

    totalPages = Math.ceil(totalDocs / limit);
    nextPage = page + 1 <= totalPages ? page + 1 : null;
    prevPage = page - 1 >= 1 ? page - 1 : null;

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

  res.json({ mentors, totalPages, nextPage, prevPage, page });
};

const getTopMentors = async (req: Request, res: Response) => {
  const mentors = await MentorModel.find({ top_mentor: true });

  return res.status(200).json(mentors);
};

// curl -X GET http://localhost:5000/api/get-topics?textSearch=a
const getTopics = async (req: Request, res: Response) => {
  const searchString = req.query.textSearch?.toString() || '';
  let topics;
  if (searchString)
    topics = await TopicModel.find({ $text: { $search: searchString } });

  return res.json(topics);
};

// curl -X GET http://localhost:5000/api/get-mentor?id=61a211ab8e41a1fc1c49c2a4
const getMentor = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || '';
  let mentor;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);
  res.json(mentor);
};

// curl -X GET http://localhost:5000/api/get-users
const getUsers = async (req: Request, res: Response) => {
  const users = await UserModel.find({});
  res.json(users);
};

// curl -X GET http://localhost:5000/api/get-user?id=61a211ab8e41a1fc1c49c2a4
const getUser = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || '';
  let user;
  if (id && isValidObjectId(id)) user = await UserModel.findById(id);
  res.json(user);
};

const isPhoneRegistered = async (req: Request, res: Response) => {
  const phone = req.query.phone ? req.query.phone.toString() : '';
  const user = await UserModel.findOne({ phone });
  res.json(Boolean(user));
};

const getBanner = async (req: Request, res: Response) => {
  const banner = await BannerModel.findOne({});

  return res.json(banner || {});
};

export default {
  getMentors,
  getUsers,
  getTopMentors,
  getMentor,
  getUser,
  getTopics,
  isPhoneRegistered,
  getBanner,
};
