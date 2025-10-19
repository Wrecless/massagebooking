import type { NextApiRequest, NextApiResponse } from 'next';

import { BookingStatus, dataStore } from '@/lib/dataStore';

type StoredBooking = ReturnType<typeof dataStore.listBookings>[number];

const withDetails = (booking: StoredBooking) => {
  const service = dataStore.getServiceById(booking.serviceId);
  const therapist = dataStore.getTherapistById(booking.therapistId);

  return {
    ...booking,
    serviceName: service?.name ?? 'Unknown Service',
    serviceDuration: service?.duration ?? 60,
    servicePrice: service?.price ?? 0,
    therapistName: therapist?.name ?? 'Assigned Therapist',
  };
};

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  const { id } = req.query;

  if (typeof id !== 'string') {
    return res.status(400).json({ error: 'Invalid booking identifier' });
  }

  const booking = dataStore.getBookingById(id);

  if (!booking) {
    return res.status(404).json({ error: 'Booking not found' });
  }

  if (req.method === 'GET') {
    return res.status(200).json(withDetails(booking));
  }

  if (req.method === 'PUT' || req.method === 'PATCH') {
    const { status, date, serviceId, therapistId } = req.body as Partial<{
      status: BookingStatus;
      date: string;
      serviceId: string;
      therapistId: string;
    }>;

    const updates: Partial<Omit<StoredBooking, 'id'>> = {};

    if (status) {
      const validStatuses: BookingStatus[] = ['confirmed', 'cancelled', 'completed'];
      if (!validStatuses.includes(status)) {
        return res.status(400).json({ error: 'Invalid booking status' });
      }
      updates.status = status;
    }

    if (date) {
      const parsedDate = new Date(date);
      if (Number.isNaN(parsedDate.getTime())) {
        return res.status(400).json({ error: 'Invalid date supplied' });
      }
      updates.date = parsedDate.toISOString();
    }

    if (serviceId) {
      updates.serviceId = serviceId;
    }

    if (therapistId) {
      updates.therapistId = therapistId;
    }

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: 'No updates supplied' });
    }

    try {
      const updated = dataStore.updateBooking(id, updates);
      return res.status(200).json(withDetails(updated));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to update booking';
      const statusCode = message.includes('available') ? 409 : 400;
      return res.status(statusCode).json({ error: message });
    }
  }

  if (req.method === 'DELETE') {
    dataStore.deleteBooking(id);
    return res.status(200).json({ message: 'Booking deleted successfully' });
  }

  res.setHeader('Allow', ['GET', 'PUT', 'PATCH', 'DELETE']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}