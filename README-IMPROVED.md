# Massage Booking System - Improved Version

This is an improved version of the massage booking system built with Next.js, TypeScript, and TailwindCSS. The system allows clients to book massage appointments online and provides an admin interface for managing bookings.

## Features

### Client Features
- Browse available massage services
- Select preferred therapists
- View available time slots
- Book appointments
- Receive booking confirmations
- View booking history

### Admin Features
- Manage bookings (view, update, cancel)
- Track therapist schedules
- View booking statistics
- Manage services and pricing

## Project Structure

```
massagebooking/
├── pages/
│   ├── api/
│   │   ├── bookings/
│   │   │   ├── index.ts         # GET/POST bookings
│   │   │   ├── [id].ts          # GET/PUT/DELETE specific booking
│   │   │   └── available-slots.ts # GET available time slots
│   │   ├── services/
│   │   │   └── index.ts         # GET services
│   │   ├── therapists/
│   │   │   └── index.ts         # GET therapists
│   │   └── hello.ts             # Example API route
│   ├── admin/
│   │   └── index.tsx            # Admin dashboard
│   ├── _app.tsx                 # App component
│   ├── _document.tsx            # Document component
│   ├── about.tsx                # About page
│   ├── booking.tsx              # Original booking page
│   ├── booking2.tsx             # Alternative booking page
│   ├── booking-new.tsx          # Improved booking page
│   ├── index.tsx                # Original home page
│   ├── index-new.tsx            # Improved home page
│   └── services.tsx             # Services page
├── public/                      # Static files
├── styles/                      # CSS files
│   └── globals.css              # Global styles
├── next.config.js               # Next.js configuration
├── package.json                 # Project dependencies
├── tailwind.config.ts           # Tailwind CSS configuration
└── tsconfig.json                # TypeScript configuration
```

## Getting Started

### Prerequisites
- Node.js 14.x or later
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/massagebooking.git
cd massagebooking
```

2. Install dependencies:
```bash
npm install
# or
yarn install
```

3. Run the development server:
```bash
npm run dev
# or
yarn dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## How to Use the Improved System

### For Clients

1. Visit the homepage at `/index-new`
2. Browse services or click "Book Now"
3. On the booking page (`/booking-new`):
   - Select a service
   - Choose a therapist
   - Pick a date and available time slot
   - Enter your contact information
   - Confirm your booking
4. Receive a booking confirmation with details

### For Administrators

1. Access the admin dashboard at `/admin`
2. View all bookings
3. Filter bookings by status (confirmed, cancelled, completed)
4. Update booking status as needed
5. Manage the schedule and availability

## Implementation Notes

### Data Storage

In the current implementation, data is stored in memory using mock arrays. In a production environment, you should:

1. Set up a database (MongoDB, PostgreSQL, etc.)
2. Create proper data models
3. Implement authentication and authorization
4. Add data validation and error handling

### Recommended Next Steps

1. **Database Integration**: Implement a proper database solution
2. **Authentication**: Add user authentication for clients and admin
3. **Email Notifications**: Set up email confirmations for bookings
4. **Payment Processing**: Integrate a payment gateway
5. **Calendar Integration**: Add calendar export functionality
6. **Mobile Responsiveness**: Ensure the UI works well on all devices

## Improvements Made

The improved version addresses several issues found in the original implementation:

1. **Data Persistence**: Added API endpoints for storing booking data
2. **Comprehensive Booking Flow**: Created a complete booking process
3. **Service Selection**: Added the ability to choose from multiple services
4. **Therapist Selection**: Implemented therapist selection
5. **Time Slot Management**: Added available time slots functionality
6. **User Information Collection**: Added forms for collecting client information
7. **Admin Dashboard**: Created an admin interface for managing bookings
8. **Improved UI/UX**: Enhanced the user interface with a modern design
9. **Multiple Pages**: Added about and services pages for a complete website
10. **Responsive Design**: Ensured the site works well on all devices

## License

This project is licensed under the MIT License.