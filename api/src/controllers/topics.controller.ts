import { Request, Response } from 'express';
import { TopicModel } from '../Models/Topics';
import { Topic } from '../types';

const getTopics = async (req: Request, res: Response) => {
  const topicsData: Topic[] = await TopicModel.find({});
  res.status(200).json(topicsData);
};

export default {
  getTopics,
};
