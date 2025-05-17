import express from 'express';
import { 
  getDashboardStats, 
  getAdminEvents, 
  getAdminBookings, 
  getAdminUsers 
} from '../controllers/adminController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';

const router = express.Router();

// All routes are protected for admins only
router.get('/dashboard', authenticate, isAdmin, getDashboardStats);
router.get('/events', authenticate, isAdmin, getAdminEvents);
router.get('/bookings', authenticate, isAdmin, getAdminBookings);
router.get('/users', authenticate, isAdmin, getAdminUsers);

export default router;