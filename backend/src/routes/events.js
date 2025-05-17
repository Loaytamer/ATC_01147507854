import express from 'express';
import { 
  getAllEvents, 
  getEventById, 
  createEvent, 
  updateEvent, 
  deleteEvent 
} from '../controllers/eventController.js';
import { authenticate, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

// Public routes
router.get('/', getAllEvents);
router.get('/:id', getEventById);

// Protected routes (admin only)
router.post('/', authenticate, isAdmin, upload.single('image'), createEvent);
router.put('/:id', authenticate, isAdmin, upload.single('image'), updateEvent);
router.delete('/:id', authenticate, isAdmin, deleteEvent);

export default router;