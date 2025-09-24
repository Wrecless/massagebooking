# Implementation Guide for Massage Booking System

This guide will help you implement the improved massage booking system. Follow these steps to upgrade your current system with the new features and improvements.

## Step 1: Review the Analysis

First, review the `ANALYSIS.md` file to understand the issues with the original code and the improvements that have been made. This will give you context for the changes.

## Step 2: Implement the API Endpoints

The API endpoints are the foundation of the improved system. They allow for data persistence and communication between the frontend and backend.

1. Create the API directories:
```bash
mkdir -p pages/api/bookings
mkdir -p pages/api/services
mkdir -p pages/api/therapists
```

2. Copy the API endpoint files from this repository:
   - `pages/api/bookings/index.ts`
   - `pages/api/bookings/[id].ts`
   - `pages/api/bookings/available-slots.ts`
   - `pages/api/services/index.ts`
   - `pages/api/therapists/index.ts`

## Step 3: Implement the New Pages

The new pages provide an improved user experience and additional functionality.

1. Copy the new page files:
   - `pages/booking-new.tsx` - Improved booking page
   - `pages/index-new.tsx` - Improved home page
   - `pages/services.tsx` - Services page
   - `pages/about.tsx` - About page
   - `pages/admin/index.tsx` - Admin dashboard

2. Rename the files to replace the original ones (optional):
```bash
mv pages/booking-new.tsx pages/booking.tsx
mv pages/index-new.tsx pages/index.tsx
```

## Step 4: Database Integration

For a production system, you'll need to replace the mock data storage with a proper database solution.

1. Install Prisma:
```bash
npm install @prisma/client
npm install prisma --save-dev
```

2. Initialize Prisma:
```bash
npx prisma init
```

3. Define your database schema in `prisma/schema.prisma`:
```prisma
// This is your Prisma schema file,
// learn more about it in the docs: https://pris.ly/d/prisma-schema

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql" // or "mysql" or "sqlite"
  url      = env("DATABASE_URL")
}

model Booking {
  id            String   @id @default(cuid())
  date          DateTime
  userId        String?
  userName      String
  userEmail     String
  userPhone     String?
  serviceId     String
  serviceName   String
  serviceDuration Int
  servicePrice  Float
  therapistId   String?
  therapistName String?
  status        String   @default("confirmed") // "confirmed", "cancelled", "completed"
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}

model Service {
  id          String   @id @default(cuid())
  name        String
  description String?
  duration    Int      // in minutes
  price       Float
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model Therapist {
  id          String   @id @default(cuid())
  name        String
  bio         String?
  specialties String[]
  image       String?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
}

model User {
  id        String   @id @default(cuid())
  name      String
  email     String   @unique
  phone     String?
  role      String   @default("client") // "client", "admin", "therapist"
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

4. Update your API endpoints to use Prisma instead of mock data.

## Step 5: Authentication

Add authentication to secure your application and enable user-specific features.

1. Install NextAuth.js:
```bash
npm install next-auth
```

2. Create an authentication API endpoint:
```bash
mkdir -p pages/api/auth
```

3. Create `pages/api/auth/[...nextauth].ts`:
```typescript
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import { compare } from 'bcrypt';

const prisma = new PrismaClient();

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email: credentials.email }
        });

        if (!user) {
          return null;
        }

        // In a real application, you would check the password
        // This is just a placeholder
        const isValid = await compare(credentials.password, user.password);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          role: user.role
        };
      }
    })
  ],
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        session.user.role = user.role;
      }
      return session;
    }
  },
  pages: {
    signIn: '/auth/signin',
    signOut: '/auth/signout',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt'
  }
});
```

4. Create authentication pages in the `pages/auth` directory.

## Step 6: Email Notifications

Add email notifications to keep users informed about their bookings.

1. Install Nodemailer:
```bash
npm install nodemailer
```

2. Create a utility function for sending emails:
```bash
mkdir -p utils
```

3. Create `utils/email.ts`:
```typescript
import nodemailer from 'nodemailer';

export async function sendBookingConfirmation(booking, userEmail) {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SERVER_HOST,
    port: Number(process.env.EMAIL_SERVER_PORT),
    secure: true,
    auth: {
      user: process.env.EMAIL_SERVER_USER,
      pass: process.env.EMAIL_SERVER_PASSWORD,
    },
  });

  const bookingDate = new Date(booking.date);
  
  const mailOptions = {
    from: process.env.EMAIL_FROM,
    to: userEmail,
    subject: 'Your Massage Booking Confirmation',
    text: `
      Hello ${booking.userName},
      
      Your booking has been confirmed!
      
      Date: ${bookingDate.toLocaleDateString()}
      Time: ${bookingDate.toLocaleTimeString()}
      Service: ${booking.serviceName}
      Duration: ${booking.serviceDuration} minutes
      Price: $${booking.servicePrice}
      
      If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.
      
      Thank you for choosing our services!
      
      Best regards,
      The Massage Booking Team
    `,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2>Booking Confirmation</h2>
        <p>Hello ${booking.userName},</p>
        <p>Your booking has been confirmed!</p>
        
        <div style="background-color: #f8f9fa; padding: 15px; border-radius: 5px; margin: 20px 0;">
          <p><strong>Date:</strong> ${bookingDate.toLocaleDateString()}</p>
          <p><strong>Time:</strong> ${bookingDate.toLocaleTimeString()}</p>
          <p><strong>Service:</strong> ${booking.serviceName}</p>
          <p><strong>Duration:</strong> ${booking.serviceDuration} minutes</p>
          <p><strong>Price:</strong> $${booking.servicePrice}</p>
        </div>
        
        <p>If you need to reschedule or cancel your appointment, please contact us at least 24 hours in advance.</p>
        
        <p>Thank you for choosing our services!</p>
        
        <p>Best regards,<br>The Massage Booking Team</p>
      </div>
    `,
  };

  return transporter.sendMail(mailOptions);
}
```

4. Update your booking API endpoint to send confirmation emails.

## Step 7: Environment Configuration

Set up environment variables for your application.

1. Create a `.env.local` file:
```
DATABASE_URL="postgresql://user:password@localhost:5432/massage_booking"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
EMAIL_SERVER_HOST="smtp.example.com"
EMAIL_SERVER_PORT=587
EMAIL_SERVER_USER="your-email@example.com"
EMAIL_SERVER_PASSWORD="your-password"
EMAIL_FROM="noreply@yourdomain.com"
GOOGLE_CLIENT_ID="your-google-client-id"
GOOGLE_CLIENT_SECRET="your-google-client-secret"
```

2. Make sure to add `.env.local` to your `.gitignore` file.

## Step 8: Testing

Test your application to ensure everything works correctly.

1. Start the development server:
```bash
npm run dev
```

2. Test the following features:
   - Home page navigation
   - Service browsing
   - Booking process
   - Admin dashboard
   - Authentication (if implemented)
   - Email notifications (if implemented)

## Step 9: Deployment

Deploy your application to a hosting service.

1. Build your application:
```bash
npm run build
```

2. Deploy to Vercel (recommended for Next.js applications):
```bash
npm install -g vercel
vercel
```

3. Or deploy to another hosting service of your choice.

## Conclusion

By following these steps, you'll have implemented a comprehensive massage booking system with all the features needed for a production environment. The system will allow clients to book appointments, manage their bookings, and receive confirmations, while giving administrators the tools they need to manage the business effectively.

If you encounter any issues during implementation, refer to the Next.js documentation or reach out for assistance.