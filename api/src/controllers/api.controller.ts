import { Request, Response } from 'express';
import { MentorModel, UserModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import { FilterQuery, isValidObjectId, ObjectId } from 'mongoose';
import { MentorSchemaType, StatsType } from '../types';
import { BannerModel } from '../Models/Banner';
import { BookingModel } from '../Models/Booking';
import { sortExperiences } from '../utils/sortExperiences';

// curl -X GET http://localhost:5000/api/get-mentors?expertise=Leadership&topic=1&limit=10&page=1&mentorSearchText=Google
const getMentors = async (req: Request, res: Response) => {
  const page = Number(req.query.page || '1');
  let totalPages = 0;
  let nextPage: number | null = null;
  let prevPage: number | null = null;
  const expertise = req.query.expertise?.toString() || 'All';
  const topic = Number(req.query.topic?.toString() || -1);
  const mentorSearchText = req.query.mentorSearchText?.toString() || '';
  const topMentor = req.query.topMentor?.toString() === 'true' || undefined;
  //  A limit() value of 0 is equivalent to setting no limit.
  const limit = Number(req.query.limit) === 0 ? 15 : Number(req.query.limit);

  const searchOptions = {} as FilterQuery<MentorSchemaType>;
  searchOptions.approved = true;
  if (topMentor) {
    searchOptions.top_mentor = topMentor;
  }

  if (topic !== -1) searchOptions.topics = topic;
  if (expertise !== 'All') searchOptions.expertise = expertise;
  if (mentorSearchText !== '') {
    searchOptions.$or = [
      { first_name: { $regex: mentorSearchText, $options: 'i' } },
      { last_name: { $regex: mentorSearchText, $options: 'i' } },
      {
        experiences: {
          $elemMatch: {
            $or: [
              { company: { $regex: mentorSearchText, $options: 'i' } },
              { role: { $regex: mentorSearchText, $options: 'i' } },
            ],
          },
        },
      },
      {
        expertise: { $elemMatch: { $regex: mentorSearchText, $options: 'i' } },
      },
    ];
  }

  let mentors = [] as Partial<MentorSchemaType>[];
  // Since we are using user input we need need to handle when user sends wrong data
  try {
    const [mentors_, totalDocs] = await Promise.all([
      MentorModel.find(searchOptions)
        .sort({ top_mentor: -1, _id: 1 })
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
        graduation_year,
        countryCode,
      }) => ({
        _id,
        first_name,
        expertise,
        last_name,
        experiences: sortExperiences(experiences),
        avatar,
        topics,
        graduation_year,
        countryCode,
      }),
    );
  } catch (error) {
    mentors = [];
  }

  res.json({ mentors, totalPages, nextPage, prevPage, page });
};

// curl -X GET http://localhost:5000/api/get-topics?textSearch=a
const getTopics = async (req: Request, res: Response) => {
  const searchString = req.query.textSearch?.toString() || '';
  const searchOptions = {} as FilterQuery<MentorSchemaType>;
  if (searchString) {
    searchOptions.$or = [
      { topicName: { $regex: searchString, $options: 'i' } },
      { motivation: { $regex: searchString, $options: 'i' } },
    ];
  }

  const topics = await TopicModel.find(searchOptions);
  return res.json(topics);
};

// curl -X GET http://localhost:5000/api/get-mentor?id=61a211ab8e41a1fc1c49c2a4
const getMentor = async (req: Request, res: Response) => {
  const id = req.query.id?.toString() || '';
  let mentor: MentorSchemaType | null = {} as MentorSchemaType;
  if (id && isValidObjectId(id)) mentor = await MentorModel.findById(id);
  if (mentor) mentor.experiences = sortExperiences(mentor.experiences);
  res.json(mentor);
};

// curl -X GET http://localhost:5000/api/get-users
const getUsers = async (req: Request, res: Response) => {
  const _users = UserModel.find({}).sort({ create_time: -1 }).select({
    _id: 1,
    first_name: 1,
    last_name: 1,
    email: 1,
    is_mentor: 1,
    mentor_information: 1,
    verified: 1,
    graduation_year: 1,
    signup_completed: 1,
    avatar: 1,
  });

  const _mentors = MentorModel.find({}).select({
    _id: 1,
    top_mentor: 1,
    approved: 1,
    experiences: 1,
  });

  const [users, mentors] = await Promise.all([_users, _mentors]);

  const modified_users = users.map((user) => {
    const mentor = mentors.find((mentor) =>
      mentor._id.equals(user.mentor_information),
    );
    if (mentor) {
      return {
        ...user.toObject(),
        ...mentor.toObject(),
        _id: user._id,
      };
    }

    return user;
  });

  res.json(modified_users);
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

const getMentorStats = async (req: Request, res: Response) => {
  try {
    const [meetings, mentor] = await Promise.all([
      BookingModel.find({ mentor: req.params.id }),
      MentorModel.findById(req.params.id),
    ]);

    if (!mentor) return res.status(404).json({ error: 'Mentor not found' });

    const stats: StatsType = {
      likes: 0,
      meetings: 0,
      reports: 0,
    };

    if (mentor.likes) {
      stats.likes = mentor.likes;
    }

    stats.meetings = meetings.reduce((acc, cur) => {
      if (cur.session.status === 'rated') {
        return acc + 1;
      }

      return acc;
    }, 0);

    return res.json(stats);
  } catch (err) {
    return res
      .status(400)
      .json({ error: err instanceof Error ? err.message : err });
  }
};

export default {
  getMentors,
  getUsers,
  getMentor,
  getUser,
  getTopics,
  isPhoneRegistered,
  getBanner,
  getMentorStats,
};
