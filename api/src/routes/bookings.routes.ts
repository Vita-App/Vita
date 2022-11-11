import express from 'express';
import bookingsController from '../controllers/bookings.controller';
import { isAuth } from '../middleware/isAuth';
import limitSessions from '../middleware/limitSessions';

const router = express.Router();

router.get('/bookings', isAuth, bookingsController.getBookings);
router.get('/busySlots', bookingsController.availability);
router.post('/bookSlot', limitSessions, isAuth, bookingsController.bookSlot);
router.get('/booking/accept/:id', isAuth, bookingsController.acceptBooking);
router.post('/booking/reject/:id', isAuth, bookingsController.rejectBooking);

export default router;
