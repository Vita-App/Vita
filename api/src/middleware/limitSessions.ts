import { Request, Response, NextFunction } from 'express';
import { Document } from 'mongoose';
import { UserSchemaType } from '../types';
import moment from 'moment-timezone';
import { MentorModel } from '../Models/User';
import { BookingModel } from '../Models/Booking';

enum BookingStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  CANCELLED = 'cancelled',
}

const limitSessions = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const user = req.user as UserSchemaType & Document;
  const { mentor_id } = req.body as {
    mentor_id: string;
  };

  const startDate = new Date(Date.now());
  const mentor = await MentorModel.findById(mentor_id);

  if (!mentor) {
    return res.status(404).json({
      error: 'Mentor not found',
    });
  }

  if (user.lastSessionRequested) {
    const lastSessionRequested = moment(user.lastSessionRequested).tz(
      moment.tz.guess(),
    );
    const requestedDate = moment(startDate).tz(moment.tz.guess());
    const diff = requestedDate.diff(lastSessionRequested, 'months');

    if (diff > 0) {
      user.currentSessionsRequested = 0;
    }
  }

  if (mentor.lastSessionReq) {
    const lastBookingDate = moment(mentor.lastSessionReq).tz(moment.tz.guess());
    const requestedDate = moment(startDate).tz(moment.tz.guess());

    const diff = requestedDate.diff(lastBookingDate, 'months');

    if (diff > 0) {
      mentor.currSessionReqs = 0;
      mentor.currentSessions = 0;
    }
  }

  if (user.currentSessionsRequested >= user.maxSessionsCanReqPerMonth) {
    return res.status(400).json({
      error:
        'You have reached the maximum number of sessions you can request for this month',
    });
  }

  if (mentor.currentSessions >= mentor.maxSessionsPerMonth) {
    return res.status(400).json({
      error: 'Mentor has reached the maximum number of sessions for this month',
    });
  }

  if (mentor.currSessionReqs >= mentor.maxSessionReqsPerMonth) {
    return res.status(400).json({
      error: 'Mentor not accepting any more requests!',
    });
  }

  const bookings = await BookingModel.find({
    mentor: mentor_id,
    start_date: {
      $gte: moment(startDate).startOf('month').toDate(),
      $lte: moment(startDate).endOf('month').toDate(),
    },
    status: {
      $in: [BookingStatus.ACCEPTED, BookingStatus.WAITING],
    },
  });

  if (bookings.length >= mentor.maxSessionsPerMonth) {
    return res.status(400).json({
      error: 'Mentor is busy for this month',
    });
  }

  await user.save();
  await mentor.save();

  next();
};

export default limitSessions;
