import { Request, Response } from 'express';
import { Document } from 'mongoose';
import Notifications from '../Models/Notifications';
import { UserSchemaType } from '../types';

const markAllAsRead = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;

  await Notifications.updateMany({ user_id: user._id }, { status: 'read' });

  return res.status(200).json({
    message: 'All notifications marked as read',
  });
};

const getNotifications = async (req: Request, res: Response) => {
  const user = req.user as Document & UserSchemaType;

  const notifications = await Notifications.find({ user: user._id });

  return res.status(200).json(notifications);
};

const notify = async (
  userId: string,
  title: string,
  text: string,
  link?: string,
) => {
  const count = await Notifications.find({
    user: userId,
  }).count();

  if (count >= 10) {
    // Delete the oldest with status 'read'
    const oldest = await Notifications.findOne({
      user: userId,
      status: 'read',
    });

    if (oldest) {
      await oldest.remove();
    } else {
      // Delete the oldest with status 'unread'
      const oldest = await Notifications.findOne({ user: userId });

      if (oldest) {
        await oldest.remove();
      }
    }
  }

  // Create a new notification
  const notification = new Notifications({
    user: userId,
    title,
    text,
    link,
  });

  await notification.save();
};

export default {
  markAllAsRead,
  getNotifications,
  notify,
};
