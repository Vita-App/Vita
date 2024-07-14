import { Router } from 'express';
import apiRoutes from './api.routes';
import adminRoutes from './admin.routes';
import authRoutes from './auth.routes';
import userRoutes from './user.routes';
import bookingsRoutes from './bookings.routes';
import webhooksRoutes from './webhooks.routes';
import notificationRoutes from './notification.routes';
import devRoutes from './dev.routes';
import waitlistRoutes from './waitlist.routes';
import topicRoutes from './topics.routes';
import { FEATURE_FLAGS } from '../config/keys';

const router = Router();

router.use(apiRoutes);
router.use(userRoutes);
router.use(adminRoutes);
router.use(authRoutes);
router.use(bookingsRoutes);
router.use(webhooksRoutes);
router.use(notificationRoutes);
if (FEATURE_FLAGS.waitlist) router.use(waitlistRoutes);
router.use(devRoutes);
router.use(topicRoutes);

export default router;
