# Event Booking System - Frontend

This is the frontend for the Event Booking System, built with React, Tailwind CSS, and various modern web technologies.

## Features

- User authentication (register, login)
- Browse events with filtering and search
- Event booking functionality
- Admin panel for event management
- Multi-language support (English and Arabic)
- Dark mode toggle
- Responsive design for all devices

## Technologies

- React with TypeScript
- React Router for navigation
- Tailwind CSS for styling
- i18next for internationalization
- Framer Motion for animations
- Axios for API requests
- React Hook Form for form handling
- Zustand for state management
- Lucide React for icons

## Setup Instructions

1. Clone the repository

2. Install dependencies:

```bash
cd frontend
npm install
```

3. Create a `.env` file in the frontend directory with your backend API URL:

```
VITE_API_URL=http://localhost:5000/api
```

4. Start the development server:

```bash
npm run dev
```

The application will be available at http://localhost:5173 by default.

## Available Scripts

- `npm run dev` - Start the development server
- `npm run build` - Build the application for production
- `npm run lint` - Run the linter
- `npm run preview` - Preview the production build locally

## Folder Structure

```
frontend/
│
├── public/               # Public assets
│
├── src/
│   ├── components/       # Reusable UI components
│   │   ├── events/       # Event-related components
│   │   ├── forms/        # Form components
│   │   ├── layout/       # Layout components
│   │   └── shared/       # Shared/common components
│   │
│   ├── contexts/         # React context providers
│   ├── hooks/            # Custom React hooks
│   ├── locales/          # Translation files
│   ├── pages/            # Page components
│   │   └── admin/        # Admin page components
│   │
│   ├── types/            # TypeScript interfaces
│   ├── utils/            # Utility functions
│   ├── App.tsx           # Main App component
│   ├── main.tsx          # Application entry point
│   └── index.css         # Global styles
│
├── .env                  # Environment variables
└── package.json          # Project dependencies
```

## Pages

- `/` - Home page with event listings
- `/events/:id` - Event details page
- `/login` - User login page
- `/register` - User registration page
- `/confirmation` - Booking confirmation page
- `/admin` - Admin dashboard
- `/admin/events` - Event management for admins
- `/admin/events/create` - Create new event
- `/admin/events/edit/:id` - Edit existing event

## Admin Access

To access the admin panel, you need an account with admin privileges. You can create an admin user directly in the database or update a user's role from 'user' to 'admin'.