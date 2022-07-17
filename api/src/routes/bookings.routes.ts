import express from 'express';
import { bookingsController } from '../controllers';
import { isAuth } from '../middleware/isAuth';

const router = express.Router();

router.get('/bookings', isAuth, bookingsController.getBookings);
router.get('/busySlots', bookingsController.availability);
router.post('/bookSlot', isAuth, bookingsController.bookSlot);
router.get('/booking/accept/:id', isAuth, bookingsController.acceptBooking);

export default router;
