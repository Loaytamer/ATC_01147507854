import Booking from "../models/Booking.js";
import Event from "../models/Event.js";

// Create a new booking
export const createBooking = async (req, res) => {
  try {
    const { eventId } = req.body;
    const userId = req.user?._id;

    // Validate userId and eventId
    if (!userId || !eventId) {
      return res
        .status(400)
        .json({ message: "User and event are required for booking." });
    }
    if (!eventId.match(/^[0-9a-fA-F]{24}$/)) {
      return res.status(400).json({ message: "Invalid event ID format." });
    }

    // Validate event exists
    const event = await Event.findById(eventId);
    if (!event) {
      return res.status(404).json({ message: "Event not found" });
    }

    // Create booking
    const booking = new Booking({
      userId,
      eventId,
    });

    await booking.save();

    res.status(201).json({
      message: "Booking successful",
      booking,
    });
  } catch (error) {
    console.error("Create booking error:", error);
    res.status(500).json({ message: "Server error creating booking" });
  }
};

// Get all bookings for a user
export const getUserBookings = async (req, res) => {
  try {
    const userId = req.user._id;

    // Get bookings with event details
    const bookings = await Booking.find({ userId })
      .populate("eventId")
      .sort({ createdAt: -1 });

    res.json(bookings);
  } catch (error) {
    console.error("Get user bookings error:", error);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
};

// Check if user has booked an event
export const checkBookingStatus = async (req, res) => {
  try {
    const eventId = req.params.eventId;
    const userId = req.user._id;

    const booking = await Booking.findOne({ userId, eventId });

    res.json({
      isBooked: !!booking,
    });
  } catch (error) {
    console.error("Check booking status error:", error);
    res.status(500).json({ message: "Server error checking booking status" });
  }
};

// Cancel a booking
export const cancelBooking = async (req, res) => {
  try {
    const bookingId = req.params.id;
    const userId = req.user._id;

    // Find booking
    const booking = await Booking.findById(bookingId);
    if (!booking) {
      return res.status(404).json({ message: "Booking not found" });
    }

    // Ensure user owns this booking
    if (booking.userId.toString() !== userId.toString()) {
      return res
        .status(403)
        .json({ message: "Not authorized to cancel this booking" });
    }

    // Delete the booking
    await Booking.findByIdAndDelete(bookingId);

    res.json({ message: "Booking cancelled successfully" });
  } catch (error) {
    console.error("Cancel booking error:", error);
    res.status(500).json({ message: "Server error cancelling booking" });
  }
};
