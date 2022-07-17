import express from 'express';

import notificationsController from '../controllers/notification.controller';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.get('/notifications', isAuth, notificationsController.getNotifications);
router.get(
  '/notifications/read',
  isAuth,
  notificationsController.markAllAsRead,
);

export default router;
