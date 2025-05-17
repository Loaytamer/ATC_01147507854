import express from 'express';
import { 
  createBooking, 
  getUserBookings, 
  checkBookingStatus, 
  cancelBooking 
} from '../controllers/bookingController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected
router.post('/', authenticate, createBooking);
router.get('/user', authenticate, getUserBookings);
router.get('/check/:eventId', authenticate, checkBookingStatus);
router.delete('/:id', authenticate, cancelBooking);

export default router;