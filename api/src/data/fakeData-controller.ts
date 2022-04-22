import { Request, Response } from 'express';
import { nanoid } from 'nanoid';
import { getMentor, getUser } from './index';
import { MentorModel, UserModel } from '../Models/User';
import { TopicModel } from '../Models/Topics';

import chalk from 'chalk';
import { topics } from '../utils/topicsData';

export const fakeDataController = async (req: Request, res: Response) => {
  const txn = [];
  for (let i = 0; i < 100; i++) {
    const id = nanoid();
    const userData = getUser(id);
    const mentorData = getMentor(
      id,
      userData.first_name,
      userData.last_name,
      userData.image_link,
    );
    const user = new UserModel(userData);
    const mentor = new MentorModel(mentorData);
    user.mentor_information = mentor._id;

    txn.push(user.save());
    console.log(chalk.magenta('user is Saved in the database'));
    txn.push(mentor.save());
    console.log(chalk.magenta('Mentor is Saved in the database'));
  }

  return await Promise.all(txn);
};

export const topicDataController = async (req: Request, res: Response) => {
  const txn = [];
  for (let i = 0; i < topics.length; i++) {
    const topic = new TopicModel(topics[i]);
    txn.push(topic.save());
    console.log(chalk.magenta(`${i} Topic is Saved in the database`));
  }

  return await Promise.all(txn);
};
