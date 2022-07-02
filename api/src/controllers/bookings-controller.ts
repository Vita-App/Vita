import { Request, Response } from 'express';

import { BookingModel } from '../Models/Booking';
import { MentorModel } from '../Models/User';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../templates';
import { UserSchemaType } from '../types';

enum BookingStatus {
  ACCEPTED = 'accepted',
  WAITING = 'waiting',
  CANCELLED = 'cancelled',
}

export const availabilityController = async (req: Request, res: Response) => {
  const { id } = req.query as { id: string };

  const mentor = await MentorModel.findById(id);

  if (!mentor) {
    return res.status(404).json({
      error: 'Mentor not found',
    });
  }

  const bookings = await BookingModel.find({
    mentor_id: mentor._id,
    status: BookingStatus.WAITING,
  });

  if (bookings.length === 0) {
    return res.json([]);
  }

  const busySlots: Date[] = [];

  for (const booking of bookings) {
    busySlots.push(booking.start_date);
  }

  return res.status(200).json(busySlots);
};

export const bookSlotController = async (req: Request, res: Response) => {
  const { start_date, mentor_id, email, topic, description } = req.body as {
    start_date: string;
    mentor_id: string;
    email?: string;
    topic?: string;
    description?: string;
  };

  if (req.user?.id === mentor_id) {
    return res.status(400).json({
      error: "You can't book yourself",
    });
  }

  const startDate = new Date(start_date);

  const mentor = await MentorModel.findById(mentor_id);

  if (!mentor) {
    return res.json(404).json({
      error: 'Mentor Not Found!',
    });
  }

  if (
    !mentor.time_slots.find(
      (slot) =>
        slot.start.getUTCHours() === startDate.getUTCHours() &&
        slot.start.getUTCMinutes() === startDate.getUTCMinutes() &&
        slot.start.getUTCDay() === startDate.getUTCDay(),
    )
  ) {
    return res.status(400).json({
      error: 'Mentor does not have a slot for given time',
    });
  }

  const existingBookings = await BookingModel.find({ mentor_id: mentor._id });

  const existingBooking = existingBookings.find(({ start_date }) => {
    if (
      start_date.getUTCHours() === startDate.getUTCHours() &&
      start_date.getUTCMinutes() === startDate.getUTCMinutes() &&
      start_date.getUTCDate() === startDate.getUTCDate()
    )
      return true;

    return false;
  });

  if (existingBooking && existingBooking.status === BookingStatus.ACCEPTED) {
    return res.status(400).json({
      error: 'Mentor is already booked',
    });
  }

  if (
    existingBooking &&
    existingBooking.status === BookingStatus.WAITING &&
    existingBooking.mentee_id === req.user?._id
  ) {
    return res.status(400).json({
      error: 'You already have one booking in waiting with this mentor!',
    });
  }

  const end_date = new Date();
  end_date.setDate(startDate.getDate());
  end_date.setMonth(startDate.getMonth());
  end_date.setHours(startDate.getHours() + 1);

  const booking = new BookingModel({
    mentor_email: mentor.email,
    mentee_email: req.user?.email,
    mentee_id: req.user?._id,
    mentor_id: mentor._id,
    start_date: startDate,
    end_date,
    session: {
      email,
      topic,
      description,
    },
  });

  const user = req.user as UserSchemaType;

  try {
    await sendEmail(
      email || mentor.email,
      'Regarding Session',
      makeTemplate('mentorBookingNotify.hbs', {
        user: user.first_name + ' ' + user.last_name,
        session: {
          topic,
          description,
        },
      }),
    );

    await booking.save();

    res.json({
      success: true,
      booking_id: booking._id,
    });
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Email couldn't send!",
    });
  }
};
