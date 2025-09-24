import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for demonstration purposes
const services = [
  {
    id: '1',
    name: 'Swedish Massage',
    description: 'A gentle form of massage that uses long strokes, kneading, deep circular movements, vibration and tapping.',
    duration: 60,
    price: 80
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description: 'A massage technique that focuses on the deeper layers of muscle tissue.',
    duration: 60,
    price: 90
  },
  {
    id: '3',
    name: 'Hot Stone Massage',
    description: 'A specialty massage where the therapist uses smooth, heated stones as an extension of their own hands.',
    duration: 90,
    price: 120
  },
  {
    id: '4',
    name: 'Aromatherapy Massage',
    description: 'A massage therapy that uses essential oils to enhance the massage experience.',
    duration: 60,
    price: 85
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all services
    return res.status(200).json(services);
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}