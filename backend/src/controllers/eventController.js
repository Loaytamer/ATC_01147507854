import Event from '../models/Event.js';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Get all events
export const getAllEvents = async (req, res) => {
  try {
    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    // Filtering
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.search) {
      filter.$text = { $search: req.query.search };
    }

    // Get events
    const events = await Event.find(filter)
      .sort({ date: 1 }) // Sort by date ascending (upcoming first)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Event.countDocuments(filter);

    res.json(events);
  } catch (error) {
    console.error('Get all events error:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

// Get event by ID
export const getEventById = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }
    res.json(event);
  } catch (error) {
    console.error('Get event by ID error:', error);
    res.status(500).json({ message: 'Server error fetching event' });
  }
};

// Create new event
export const createEvent = async (req, res) => {
  try {
    const { name, description, category, date, venue, price } = req.body;

    // Validate input
    if (!name || !description || !category || !date || !venue || !price) {
      return res.status(400).json({ message: 'All fields are required' });
    }

    // Create event object
    const event = new Event({
      name,
      description,
      category,
      date,
      venue,
      price: parseFloat(price),
    });

    // Add image if uploaded
    if (req.file) {
      event.image = `/uploads/${req.file.filename}`;
    }

    // Save to database
    await event.save();

    res.status(201).json(event);
  } catch (error) {
    console.error('Create event error:', error);
    res.status(500).json({ message: 'Server error creating event' });
  }
};

// Update event
export const updateEvent = async (req, res) => {
  try {
    const eventId = req.params.id;
    const { name, description, category, date, venue, price } = req.body;

    // Find existing event
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Update fields
    if (name) event.name = name;
    if (description) event.description = description;
    if (category) event.category = category;
    if (date) event.date = date;
    if (venue) event.venue = venue;
    if (price) event.price = parseFloat(price);

    // Update image if new one uploaded
    if (req.file) {
      // Delete old image if exists
      if (event.image) {
        const oldImagePath = path.join(__dirname, '../../', event.image);
        if (fs.existsSync(oldImagePath)) {
          fs.unlinkSync(oldImagePath);
        }
      }
      event.image = `/uploads/${req.file.filename}`;
    }

    // Save updates
    await event.save();

    res.json(event);
  } catch (error) {
    console.error('Update event error:', error);
    res.status(500).json({ message: 'Server error updating event' });
  }
};

// Delete event
export const deleteEvent = async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) {
      return res.status(404).json({ message: 'Event not found' });
    }

    // Delete associated image if exists
    if (event.image) {
      const imagePath = path.join(__dirname, '../../', event.image);
      if (fs.existsSync(imagePath)) {
        fs.unlinkSync(imagePath);
      }
    }

    // Delete event from database
    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: 'Event deleted successfully' });
  } catch (error) {
    console.error('Delete event error:', error);
    res.status(500).json({ message: 'Server error deleting event' });
  }
};