import Event from '../models/Event.js';
import User from '../models/User.js';
import Booking from '../models/Booking.js';

// Get dashboard stats
export const getDashboardStats = async (req, res) => {
  try {
    // Count total events
    const totalEvents = await Event.countDocuments();

    // Count upcoming events (from today onwards)
    const upcomingEvents = await Event.countDocuments({
      date: { $gte: new Date() },
    });

    // Count total bookings
    const totalBookings = await Booking.countDocuments();

    // Count total users
    const totalUsers = await User.countDocuments({ role: 'user' });

    res.json({
      totalEvents,
      upcomingEvents,
      totalBookings,
      totalUsers,
    });
  } catch (error) {
    console.error('Get dashboard stats error:', error);
    res.status(500).json({ message: 'Server error fetching dashboard stats' });
  }
};

// Get all events (admin version with booking counts)
export const getAdminEvents = async (req, res) => {
  try {
    // Get all events
    const events = await Event.find().sort({ createdAt: -1 });

    // For each event, get booking count
    const eventsWithBookingCounts = await Promise.all(
      events.map(async (event) => {
        const bookingCount = await Booking.countDocuments({ eventId: event._id });
        return {
          ...event.toObject(),
          bookingCount,
        };
      })
    );

    res.json(eventsWithBookingCounts);
  } catch (error) {
    console.error('Get admin events error:', error);
    res.status(500).json({ message: 'Server error fetching events' });
  }
};

// Get all bookings (admin version)
export const getAdminBookings = async (req, res) => {
  try {
    // Get all bookings with user and event details
    const bookings = await Booking.find()
      .populate('userId', 'name email')
      .populate('eventId')
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error('Get admin bookings error:', error);
    res.status(500).json({ message: 'Server error fetching bookings' });
  }
};

// Get all users (admin version)
export const getAdminUsers = async (req, res) => {
  try {
    // Get all users (excluding password)
    const users = await User.find().select('-password').sort({ createdAt: -1 });

    res.json(users);
  } catch (error) {
    console.error('Get admin users error:', error);
    res.status(500).json({ message: 'Server error fetching users' });
  }
};