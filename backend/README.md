# Event Booking System - Backend

This is the backend API for the Event Booking System, built with Node.js, Express, and MongoDB.

## Features

- User authentication (register, login)
- Role-based access control (admin, user)
- Event management (create, read, update, delete)
- Booking system (create, cancel bookings)
- File uploads for event images
- Admin dashboard statistics

## Technologies

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS for cross-origin requests

## Setup Instructions

1. Clone the repository

2. Install dependencies:

```bash
cd backend
npm install
```

3. Create a `.env` file based on the `.env.example` file:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking-system
JWT_SECRET=your-secret-key
UPLOAD_PATH=uploads
```

4. Start the development server:

```bash
npm run dev
```

The server will start on the port specified in the `.env` file (default: 5000).

## API Endpoints

### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login a user
- `GET /api/auth/me` - Get current user info (requires authentication)

### Events

- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get a specific event
- `POST /api/events` - Create a new event (admin only)
- `PUT /api/events/:id` - Update an event (admin only)
- `DELETE /api/events/:id` - Delete an event (admin only)

### Bookings

- `POST /api/bookings` - Create a new booking
- `GET /api/bookings/user` - Get current user's bookings
- `GET /api/bookings/check/:eventId` - Check if user has booked an event
- `DELETE /api/bookings/:id` - Cancel a booking

### Admin

- `GET /api/admin/dashboard` - Get dashboard statistics (admin only)
- `GET /api/admin/events` - Get all events with booking counts (admin only)
- `GET /api/admin/bookings` - Get all bookings (admin only)
- `GET /api/admin/users` - Get all users (admin only)

## Folder Structure

```
backend/
│
├── src/
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── index.js          # Entry point
│
├── uploads/              # Uploaded files
├── .env                  # Environment variables
└── package.json          # Project dependencies
```