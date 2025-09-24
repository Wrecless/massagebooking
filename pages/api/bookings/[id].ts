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
  const { id } = req.query;
  
  // Find the booking by ID
  const bookingIndex = bookings.findIndex(booking => booking.id === id);
  
  if (bookingIndex === -1) {
    return res.status(404).json({ error: 'Booking not found' });
  }
  
  if (req.method === 'GET') {
    // Return the booking
    return res.status(200).json(bookings[bookingIndex]);
  } else if (req.method === 'PUT' || req.method === 'PATCH') {
    // Update the booking
    const { status, date, serviceId, therapistId } = req.body;
    
    // Check if the new slot is already booked (if changing date/therapist)
    if (date && date !== bookings[bookingIndex].date || 
        therapistId && therapistId !== bookings[bookingIndex].therapistId) {
      
      const isSlotBooked = bookings.some(
        booking => 
          booking.id !== id && // Exclude current booking
          booking.date === (date || bookings[bookingIndex].date) && 
          booking.therapistId === (therapistId || bookings[bookingIndex].therapistId) &&
          booking.status === 'confirmed'
      );
      
      if (isSlotBooked) {
        return res.status(409).json({ error: 'This slot is already booked' });
      }
    }
    
    // Update the booking
    bookings[bookingIndex] = {
      ...bookings[bookingIndex],
      ...(status && { status }),
      ...(date && { date }),
      ...(serviceId && { serviceId }),
      ...(therapistId && { therapistId })
    };
    
    return res.status(200).json(bookings[bookingIndex]);
  } else if (req.method === 'DELETE') {
    // Delete the booking
    bookings = bookings.filter(booking => booking.id !== id);
    
    return res.status(200).json({ message: 'Booking deleted successfully' });
  } else {
    res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}