import type { NextApiRequest, NextApiResponse } from 'next';

import { dataStore } from '@/lib/dataStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'GET') {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { date, therapistId, serviceId } = req.query;

  if (typeof date !== 'string' || date.length === 0) {
    return res.status(400).json({ error: 'Date parameter is required' });
  }

  if (typeof therapistId !== 'string' || therapistId.length === 0) {
    return res.status(400).json({ error: 'Therapist parameter is required' });
  }

  if (typeof serviceId !== 'string' || serviceId.length === 0) {
    return res.status(400).json({ error: 'Service parameter is required' });
  }

  try {
    const availableSlots = dataStore.getAvailableSlots(date, therapistId, serviceId);
    return res.status(200).json({
      date,
      therapistId,
      serviceId,
      availableSlots,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unable to determine available slots';
    return res.status(400).json({ error: message });
  }
}