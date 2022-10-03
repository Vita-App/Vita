import { Request, Response } from 'express';
import topicsData from '../data/topicsData';

const getTopics = async (req: Request, res: Response) => {
  res.status(200).json(topicsData);
};

export default {
  getTopics,
};
