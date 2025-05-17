import mongoose from 'mongoose';

const eventSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    description: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
      trim: true,
    },
    date: {
      type: Date,
      required: true,
    },
    venue: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min: 0,
    },
    image: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

// Create index for searching
eventSchema.index(
  { 
    name: 'text', 
    description: 'text', 
    category: 'text', 
    venue: 'text' 
  }
);

// Create Event model
const Event = mongoose.model('Event', eventSchema);

export default Event;