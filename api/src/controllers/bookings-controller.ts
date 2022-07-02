import { Request, Response } from 'express';

import { BookingModel } from '../Models/Booking';
import { MentorModel, UserModel } from '../Models/User';
import { DurationType } from '../types';

export const getAvailableSlots = async (req: Request, res: Response) => {
  const { date, mentor_id } = req.query as {
    date: string;
    mentor_id: string;
  };

  const queryDate = new Date(date);

  const mentor = await MentorModel.findById(mentor_id);

  if (!mentor) {
    return res.status(404).json({
      error: 'Mentor not found!',
    });
  }

  let mentor_bookings = await BookingModel.find({ mentor_id: mentor._id });

  if (mentor_bookings.length === 0) {
    return res
      .status(200)
      .json(
        mentor.time_slots.filter(
          (slot) => slot.start.getUTCDay() === queryDate.getUTCDay(),
        ),
      );
  }

  mentor_bookings = mentor_bookings.filter(({ start_date }) => {
    if (
      start_date.getUTCMonth() === queryDate.getUTCMonth() &&
      start_date.getUTCDate() === queryDate.getUTCDate() &&
      start_date.getUTCFullYear() === queryDate.getUTCFullYear()
    ) {
      return true;
    }

    return false;
  });

  const availableSlots: DurationType[] = [];

  for (const slot of mentor.time_slots) {
    const found = mentor_bookings.find((booking) => {
      if (booking.start_date.getUTCHours() === slot.start.getUTCHours())
        return booking;
      return false;
    });

    if (!found) {
      if (slot.start.getUTCDay() === queryDate.getUTCDay()) {
        availableSlots.push(slot);
      }
    }
  }

  return res.status(200).json(availableSlots);
};

export const bookSlot = async (req: Request, res: Response) => {
  const { start_date, mentor_id, mentee_id } = req.body as {
    start_date: string;
    mentor_id: string;
    mentee_id: string;
  };

  console.log(start_date);
  const startDate = new Date(start_date);

  const mentor = await MentorModel.findById(mentor_id);
  const mentee = await UserModel.findById(mentee_id);

  if (!mentor || !mentee) {
    return res.json(404).json({
      error: 'Mentor/Mentee Not Found!',
    });
  }

  if (
    !mentor.time_slots.find(
      (slot) =>
        slot.start.getUTCHours() === startDate.getUTCHours() &&
        slot.start.getUTCDay() === startDate.getUTCDay(),
    )
  ) {
    return res.status(400).json({
      error: 'Mentor does not have a slot for given time',
    });
  }

  const existingBookings = await BookingModel.find({ mentor_id: mentor._id });

  if (
    existingBookings.find(({ start_date }) => {
      if (
        start_date.getUTCHours() === startDate.getUTCHours() &&
        start_date.getUTCDate() === startDate.getUTCDate()
      )
        return true;

      return false;
    })
  )
    return res.status(400).json({
      error: 'Mentor is already booked',
    });

  const end_date = new Date();
  end_date.setDate(startDate.getDate());
  end_date.setHours(startDate.getHours() + 1);

  const booking = new BookingModel({
    mentor_email: mentor.email,
    mentee_email: mentee.email,
    mentee_id,
    mentor_id: mentor._id,
    start_date: startDate,
    end_date,
  });

  //   await booking.save();

  res.json({
    success: true,
    booking_id: booking._id,
  });
};
