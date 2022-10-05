import { Request, Response } from 'express';
import { TopicModel } from '../Models/Topics';
import { Topic } from '../types';

// curl -X GET http://localhost:5000/api/get-topics?limit=15&page=1
const getTopics = async (req: Request, res: Response) => {
  const page = Number(req.query.page || '1');

  let totalPages = 0;
  let nextPage: number | null = null;
  let prevPage: number | null = null;

  const limit = Number(req.query.limit) === 0 ? 15 : Number(req.query.limit);

  const searchOptions = {};

  const [topicsData, topicsLen] = await Promise.all([
    TopicModel.find(searchOptions)
      .skip(limit * (page - 1))
      .limit(limit),
    TopicModel.countDocuments(searchOptions),
  ]);

  totalPages = Math.ceil(topicsLen / limit);
  nextPage = page + 1 <= totalPages ? page + 1 : null;
  prevPage = page - 1 >= totalPages ? page - 1 : null;

  res.status(200).json({
    topicsData,
    totalPages,
    page,
    nextPage,
    prevPage,
  });
};

export default {
  getTopics,
};
