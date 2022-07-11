import { Request, Response } from 'express';
import { Document } from 'mongoose';

import { BookingModel } from '../Models/Booking';
import { MentorModel, UserModel } from '../Models/User';
import {
  sendBookingConfirmationMessage,
  sendBookingRequestMessage,
} from '../service/whatsapp-service';
import { sendEmail } from '../service/email-service';
import { makeTemplate } from '../templates';

import {
  AttendeesEmailTypes,
  CalendarOptionTypes,
  UserSchemaType,
} from '../types';

import createCalenderEvent from '../utils/createCalendarEvent';
import moment from 'moment-timezone';

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
    status: BookingStatus.ACCEPTED, // This should be BookingStatus.ACCEPTED
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
  const user = req.user as UserSchemaType & Document;
  const { start_date, mentor_id, email, topic, description } = req.body as {
    start_date: string;
    mentor_id: string;
    email?: string;
    topic?: string;
    description?: string;
  };

  if (user._id === mentor_id) {
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

  const alreadyWaiting = await BookingModel.findOne({
    mentee_id: user._id,
    mentor_id,
    status: BookingStatus.WAITING,
  });

  if (alreadyWaiting) {
    return res.status(400).json({
      error:
        'You already have a booking slot in waiting with this mentor. You cannot book for one more till that slot is accepted or cancelled',
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
    existingBooking.mentee_id === user._id
  ) {
    return res.status(400).json({
      error: 'You already have one booking in waiting with this mentor!',
    });
  }

  const end_date = new Date();
  end_date.setDate(startDate.getDate());
  end_date.setMonth(startDate.getMonth());
  end_date.setMinutes(startDate.getMinutes());
  end_date.setHours(startDate.getHours() + 1);

  const booking = new BookingModel({
    mentor_email: mentor.email,
    mentee_email: user.email,
    mentor_phone: mentor.phone,
    mentee_phone: user.phone,
    mentee_id: user._id,
    mentor_id: mentor._id,
    start_date: startDate,
    end_date,
    session: {
      email,
      topic,
      description,
    },
  });

  const menteeName = `${user.first_name} ${user.last_name}`;
  const mentorName = `${mentor.first_name} ${mentor.last_name}`;
  const date = moment(startDate).tz(mentor.timezone);
  await sendBookingRequestMessage(
    mentor.phone,
    mentorName,
    menteeName,
    date.format('dddd, MMMM Do YYYY, h:mm a'),
    mentor._id,
    booking._id,
  );

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

export const acceptBookingController = async (req: Request, res: Response) => {
  try {
    const mentor = req.user as UserSchemaType & Document;
    const { id } = req.params;
    const booking = await BookingModel.findById(id);

    if (!booking) {
      return res.json(404).json({
        error: 'Booking Not Found!',
      });
    }

    if (booking.mentor_id?.toString() !== mentor._id.toString()) {
      return res
        .status(404)
        .json({ error: 'You dont have access to accept this booking!' });
    }

    if (booking.status === BookingStatus.ACCEPTED) {
      return res.status(400).json({
        error: 'Booking already accepted',
      });
    }

    booking.status = BookingStatus.ACCEPTED;

    const attendeesEmails: AttendeesEmailTypes[] = [
      { email: booking.mentor_email },
      { email: booking.mentee_email },
    ];

    const options: CalendarOptionTypes = {
      startTime: booking.start_date,
      endTime: booking.end_date,
      attendeesEmails,
      summary: booking.session.topic,
      description: booking.session.description,
    };

    const googleMeetLink = await createCalenderEvent(options);
    booking.google_meeting_link = googleMeetLink;

    const mentee = (await UserModel.findById(
      booking.mentee_id,
    )) as UserSchemaType;

    const slot = moment(booking.start_date);
    const googleMeetCode = googleMeetLink.split('/').pop();
    const mentorName = `${mentor.first_name} ${mentor.last_name}`;
    const menteeName = `${mentee.first_name} ${mentee.last_name}`;

    await sendBookingConfirmationMessage(
      mentee.phone,
      menteeName,
      mentorName,
      booking.session.topic || '',
      slot.tz(mentee.timezone).format('dddd, MMMM Do YYYY, h:mm a'),
      googleMeetCode,
    );

    await sendBookingConfirmationMessage(
      mentor.phone,
      mentorName,
      menteeName,
      booking.session.topic || '',
      slot.tz(mentor.timezone).format('dddd, MMMM Do YYYY, h:mm a'),
      googleMeetCode,
    );

    // await booking.save();

    return res.status(200).json({ googleMeetLink, message: 'Meet Scheduled!' });
  } catch (err: any) {
    console.log(err.message);
    return res.status(500).json({
      message: 'Unable to Schedule meet',
    });
  }
};
