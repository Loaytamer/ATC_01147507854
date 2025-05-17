# Event Booking System

A full-stack event booking system built with React, Node.js, Express, and MongoDB. The system allows users to browse, search, and book events, while administrators can manage events and view booking statistics.

## Features

### User Features

- User authentication (register, login)
- Browse events with filtering and search 
- Event booking functionality
- View booking history
- Multi-language support (English and Arabic)
- Dark mode toggle
- Responsive design for all devices

### Admin Features

- Admin dashboard with statistics
- Event management (create, read, update, delete)
- User management
- Booking management
- File uploads for event images

## Tech Stack

### Frontend

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- i18next for internationalization
- Framer Motion for animations
- Axios for API requests
- React Hook Form for form handling
- Zustand for state management
- Lucide React for icons

### Backend

- Node.js
- Express.js
- MongoDB with Mongoose
- JWT for authentication
- Multer for file uploads
- CORS for cross-origin requests

## Project Structure

```
project/
│
├── frontend/            # React frontend application
│   ├── public/          # Public assets
│   └── src/
│       ├── components/  # Reusable UI components
│       ├── contexts/    # React context providers
│       ├── hooks/       # Custom React hooks
│       ├── locales/     # Translation files
│       ├── pages/       # Page components
│       ├── types/       # TypeScript interfaces
│       └── utils/       # Utility functions
│
├── backend/             # Node.js backend application
│   ├── src/
│   │   ├── controllers/ # Request handlers
│   │   ├── middleware/  # Custom middleware
│   │   ├── models/      # MongoDB models
│   │   ├── routes/      # API routes
│   │   └── index.js     # Entry point
│   └── uploads/         # Uploaded files
│
└── README.md           # Project documentation
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- MongoDB (v4.4 or higher)
- npm or yarn package manager

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the backend directory:

```
PORT=5000
MONGODB_URI=mongodb://localhost:27017/event-booking-system
JWT_SECRET=your-secret-key
UPLOAD_PATH=uploads
```

4. Start the backend server:

```bash
npm run dev
```

The backend server will start on http://localhost:5000

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the frontend directory:

```
VITE_API_URL=http://localhost:5000/api
```

4. Start the frontend development server:

```bash
npm run dev
```

The frontend application will be available at http://localhost:5173

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

## Frontend Routes

- `/` - Home page with event listings
- `/events/:id` - Event details page
- `/login` - User login page
- `/register` - User registration page
- `/confirmation` - Booking confirmation page
- `/admin` - Admin dashboard
- `/admin/events` - Event management for admins
- `/admin/events/create` - Create new event
- `/admin/events/edit/:id` - Edit existing event

## Available Scripts

### Backend

- `npm run dev` - Start the development server
- `npm start` - Start the production server
- `npm run lint` - Run the linter

### Frontend

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run the linter
- `npm run preview` - Preview the production build locally

## Admin Access

To access the admin panel, you need an account with admin privileges. You can create an admin user directly in the database or update a user's role from 'user' to 'admin'.

