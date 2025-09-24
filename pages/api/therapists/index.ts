import { NextApiRequest, NextApiResponse } from 'next';

// Mock database for demonstration purposes
const therapists = [
  {
    id: '1',
    name: 'Jane Smith',
    bio: 'Jane has 10+ years of experience in various massage techniques, specializing in Swedish and Deep Tissue massage.',
    specialties: ['Swedish Massage', 'Deep Tissue Massage'],
    image: '/images/therapist1.jpg'
  },
  {
    id: '2',
    name: 'John Davis',
    bio: 'John is certified in Hot Stone and Aromatherapy massage with 5 years of experience in luxury spas.',
    specialties: ['Hot Stone Massage', 'Aromatherapy Massage'],
    image: '/images/therapist2.jpg'
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    bio: 'Sarah specializes in sports massage and rehabilitation therapy, helping athletes recover from injuries.',
    specialties: ['Sports Massage', 'Rehabilitation Therapy'],
    image: '/images/therapist3.jpg'
  }
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    // Return all therapists
    return res.status(200).json(therapists);
  } else {
    res.setHeader('Allow', ['GET']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}