import type { NextApiRequest, NextApiResponse } from 'next';

import { dataStore } from '@/lib/dataStore';

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
  if (req.method === 'GET') {
    const records = dataStore.listBookings().map((booking) => withDetails(booking));
    return res.status(200).json(records);
  }

  if (req.method === 'POST') {
    const { date, serviceId, therapistId, userName, userEmail, userPhone } = req.body;

    if (!date || !serviceId || !therapistId || !userName || !userEmail) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const parsedDate = new Date(date);
    if (Number.isNaN(parsedDate.getTime())) {
      return res.status(400).json({ error: 'Invalid date supplied' });
    }

    try {
      const booking = dataStore.createBooking({
        date: parsedDate.toISOString(),
        serviceId,
        therapistId,
        userName,
        userEmail,
        userPhone,
      });

      return res.status(201).json(withDetails(booking));
    } catch (error: unknown) {
      const message = error instanceof Error ? error.message : 'Unable to create booking';
      const status = message.includes('available') ? 409 : 400;
      return res.status(status).json({ error: message });
    }
  }

  res.setHeader('Allow', ['GET', 'POST']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}