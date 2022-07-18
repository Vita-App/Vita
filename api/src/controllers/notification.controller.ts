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

export default {
  markAllAsRead,
  getNotifications,
};