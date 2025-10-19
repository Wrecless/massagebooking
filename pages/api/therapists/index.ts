import type { NextApiRequest, NextApiResponse } from 'next';

import { dataStore } from '@/lib/dataStore';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    return res.status(200).json(dataStore.getTherapists());
  }

  res.setHeader('Allow', ['GET']);
  return res.status(405).end(`Method ${req.method} Not Allowed`);
}