import { Request, Response } from 'express';
import { MentorModel } from '../Models/User';

export const getMentorFTSController = async (req: Request, res: Response) => {
  const searchText: string = req.query.mentorSearchText?.toString() || '';
  const mentorsRetrievedfromDatatbase = await MentorModel.find({
    $text: { $search: searchText },
  }).sort({ score: { $meta: 'textScore' } });
  res.json(mentorsRetrievedfromDatatbase);
};
