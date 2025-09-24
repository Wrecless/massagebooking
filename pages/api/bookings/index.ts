import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for demonstration purposes
// In a real application, you would use a database like MongoDB, PostgreSQL, etc.
let bookings = [
  {
    id: '1',
    date: '2023-09-25T10:00:00Z',
    userId: 'user1',
    serviceId: 'service1',
    therapistId: 'therapist1',
    status: 'confirmed',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '123-456-7890',
    serviceName: 'Swedish Massage',
    serviceDuration: 60,
    servicePrice: 80,
    therapistName: 'Jane Smith'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all bookings
    return res.status(200).json(bookings);
  } else if (req.method === 'POST') {
    // Create a new booking
    const { date, userId, serviceId, therapistId, userName, userEmail, userPhone } = req.body;
    
    // Validate required fields
    if (!date || !userName || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    // Check if the slot is already booked
    const isSlotBooked = bookings.some(
      booking => 
        booking.date === date && 
        booking.therapistId === therapistId &&
        booking.status === 'confirmed'
    );
    
    if (isSlotBooked) {
      return res.status(409).json({ error: 'This slot is already booked' });
    }
    
    // Mock service and therapist data
    // In a real application, you would fetch this from your database
    const service = {
      id: serviceId,
      name: 'Swedish Massage',
      duration: 60,
      price: 80
    };
    
    const therapist = {
      id: therapistId,
      name: 'Jane Smith'
    };
    
    // Create a new booking
    const newBooking = {
      id: String(bookings.length + 1),
      date,
      userId,
      serviceId,
      therapistId,
      status: 'confirmed',
      userName,
      userEmail,
      userPhone,
      serviceName: service.name,
      serviceDuration: service.duration,
      servicePrice: service.price,
      therapistName: therapist.name
    };
    
    bookings.push(newBooking);
    
    return res.status(201).json(newBooking);
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}