import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getMentor, getUser } from './index';
import { MentorModel, UserModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';
import chalk from 'chalk';
import { topics } from '../utils/topicsData';
import { getDevUser } from '../dev';

export const fakeDataController = async (req: Request, res: Response) => {
  await Promise.all([UserModel.deleteMany({}), MentorModel.deleteMany({})]);

  console.log(chalk.green('Deleted all users and mentors'));

  const txn = [];
  for (let i = 0; i < 100; i++) {
    const id = nanoid();
    const userData = getUser(id);

    const user = new UserModel(userData);
    if (userData.is_mentor) {
      const mentorData = getMentor(
        id,
        userData.first_name,
        userData.last_name,
        userData.avatar.url || '',
        userData.email,
        userData.phone,
        userData.graduation_year,
      );
      const mentor = new MentorModel({
        ...mentorData,
        timezone: userData.timezone,
      });
      user.mentor_information = mentor._id;
      txn.push(mentor.save());
    }

    txn.push(user.save());
  }

  // Create dev users
  const { userData: menteeUser } = getDevUser(false);
  const { userData: mentorUser, mentorData } = getDevUser(true);

  const mentee = new UserModel(menteeUser);
  txn.push(mentee.save());

  const mentor = new UserModel(mentorUser);
  const mentorDoc = new MentorModel(mentorData);
  mentor.mentor_information = mentorDoc._id;
  txn.push(mentor.save());
  txn.push(mentorDoc.save());

  await Promise.all(txn);
  console.log(chalk.green('All users are saved in the database'));

  return res.status(200).json({
    message: 'All users are saved in the database',
  });
};

export const topicDataController = async () => {
  const txn = [];
  for (let i = 0; i < topics.length; i++) {
    const topic = new TopicModel(topics[i]);
    txn.push(topic.save());
    console.log(chalk.magenta(`${i} Topic is Saved in the database`));
  }

  return await Promise.all(txn);
};
