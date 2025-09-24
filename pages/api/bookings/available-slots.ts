import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for demonstration purposes
const bookings = [
  {
    id: '1',
    date: '2023-09-25T10:00:00Z',
    therapistId: '1',
    status: 'confirmed'
  },
  {
    id: '2',
    date: '2023-09-25T14:00:00Z',
    therapistId: '1',
    status: 'confirmed'
  },
  {
    id: '3',
    date: '2023-09-25T11:00:00Z',
    therapistId: '2',
    status: 'confirmed'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    const { date, therapistId, serviceId } = req.query;
    
    if (!date) {
      return res.status(400).json({ error: 'Date parameter is required' });
    }
    
    // Parse the date to get the day
    const selectedDate = new Date(date as string);
    const dayStart = new Date(selectedDate);
    dayStart.setHours(0, 0, 0, 0);
    
    const dayEnd = new Date(selectedDate);
    dayEnd.setHours(23, 59, 59, 999);
    
    // Business hours (9 AM to 5 PM)
    const businessStart = 9; // 9 AM
    const businessEnd = 17; // 5 PM
    
    // Generate all possible time slots for the day
    const allSlots = [];
    for (let hour = businessStart; hour < businessEnd; hour++) {
      const slotTime = new Date(dayStart);
      slotTime.setHours(hour);
      allSlots.push(slotTime.toISOString());
    }
    
    // Filter out booked slots for the selected therapist
    const bookedSlots = bookings
      .filter(booking => 
        booking.status === 'confirmed' && 
        (!therapistId || booking.therapistId === therapistId) &&
        new Date(booking.date) >= dayStart && 
        new Date(booking.date) <= dayEnd
      )
      .map(booking => booking.date);
    
    // Available slots are all slots minus booked slots
    const availableSlots = allSlots.filter(slot => !bookedSlots.includes(slot));
    
    return res.status(200).json({
      date: date,
      therapistId: therapistId || 'any',
      availableSlots: availableSlots
    });
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}