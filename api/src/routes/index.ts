import { Router } from 'express';
import apiRoutes from './api.routes';
import adminRoutes from './admin.routes';
import authRoutes from './auth.routes';
import bookingsRoutes from './bookings.routes';
import webhooksRoutes from './webhooks.routes';
import devRoutes from './dev.routes';

const router = Router();

router.use(apiRoutes);
router.use(adminRoutes);
router.use(authRoutes);
router.use(bookingsRoutes);
router.use(webhooksRoutes);
router.use(devRoutes);

export default router;
