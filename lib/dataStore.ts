import { randomUUID } from 'crypto';

export type BookingStatus = 'confirmed' | 'cancelled' | 'completed';

export interface Service {
  id: string;
  name: string;
  description: string;
  duration: number; // minutes
  price: number; // dollars
}

export interface Therapist {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  image: string;
}

export interface Booking {
  id: string;
  date: string; // ISO string representing start time
  userName: string;
  userEmail: string;
  userPhone?: string;
  serviceId: string;
  therapistId: string;
  status: BookingStatus;
}

const services: Service[] = [
  {
    id: '1',
    name: 'Swedish Massage',
    description:
      'A gentle full-body massage that uses long strokes, kneading, and circular movements to relax and energise you.',
    duration: 60,
    price: 80,
  },
  {
    id: '2',
    name: 'Deep Tissue Massage',
    description:
      'Targets deeper muscle layers using slower, more forceful strokes. Ideal for chronic aches and tight muscles.',
    duration: 60,
    price: 95,
  },
  {
    id: '3',
    name: 'Hot Stone Massage',
    description:
      'Heated stones combined with therapeutic massage techniques melt away tension and ease sore muscles.',
    duration: 90,
    price: 125,
  },
  {
    id: '4',
    name: 'Aromatherapy Massage',
    description:
      'Essential oils tailored to your mood elevate a soothing massage focused on relaxation and stress relief.',
    duration: 60,
    price: 85,
  },
];

const therapists: Therapist[] = [
  {
    id: '1',
    name: 'Jane Smith',
    bio: 'Over a decade of experience blending Swedish and Deep Tissue techniques for personalised treatments.',
    specialties: ['Swedish Massage', 'Deep Tissue Massage'],
    image: '/images/therapist1.jpg',
  },
  {
    id: '2',
    name: 'John Davis',
    bio: 'Certified in hot stone therapy and aromatherapy with a passion for holistic wellbeing.',
    specialties: ['Hot Stone Massage', 'Aromatherapy Massage'],
    image: '/images/therapist2.jpg',
  },
  {
    id: '3',
    name: 'Sarah Johnson',
    bio: 'Sports therapy specialist helping clients recover from injury and optimise performance.',
    specialties: ['Sports Massage', 'Rehabilitation Therapy'],
    image: '/images/therapist3.jpg',
  },
];

let bookings: Booking[] = [
  {
    id: '1',
    date: '2023-09-25T10:00:00.000Z',
    userName: 'John Doe',
    userEmail: 'john@example.com',
    userPhone: '123-456-7890',
    serviceId: '1',
    therapistId: '1',
    status: 'confirmed',
  },
];

const BUSINESS_START_HOUR = 9;
const BUSINESS_END_HOUR = 17;
const SLOT_INTERVAL_MINUTES = 30;

export const dataStore = {
  getServices(): Service[] {
    return services;
  },

  getServiceById(serviceId: string): Service | undefined {
    return services.find((service) => service.id === serviceId);
  },

  getTherapists(): Therapist[] {
    return therapists;
  },

  getTherapistById(therapistId: string): Therapist | undefined {
    return therapists.find((therapist) => therapist.id === therapistId);
  },

  listBookings(): Booking[] {
    return bookings;
  },

  getBookingById(id: string): Booking | undefined {
    return bookings.find((booking) => booking.id === id);
  },

  createBooking(booking: Omit<Booking, 'id' | 'status'> & { status?: BookingStatus }): Booking {
    const service = this.getServiceById(booking.serviceId);

    if (!service) {
      throw new Error('Service not found');
    }

    if (!this.isSlotAvailable(booking.date, booking.therapistId, service.duration)) {
      throw new Error('Requested slot is no longer available');
    }

    const newBooking: Booking = {
      ...booking,
      id: randomUUID(),
      status: booking.status ?? 'confirmed',
    };

    bookings = [...bookings, newBooking];
    return newBooking;
  },

  updateBooking(id: string, updates: Partial<Omit<Booking, 'id'>>): Booking {
    const existing = this.getBookingById(id);

    if (!existing) {
      throw new Error('Booking not found');
    }

    const next: Booking = { ...existing, ...updates };

    if (updates.date || updates.therapistId || updates.serviceId) {
      const service = this.getServiceById(next.serviceId);
      if (!service) {
        throw new Error('Service not found');
      }

      if (!this.isSlotAvailable(next.date, next.therapistId, service.duration, id)) {
        throw new Error('Requested slot is no longer available');
      }
    }

    bookings = bookings.map((booking) => (booking.id === id ? next : booking));
    return next;
  },

  deleteBooking(id: string): void {
    bookings = bookings.filter((booking) => booking.id !== id);
  },

  getAvailableSlots(dateIso: string, therapistId: string, serviceId: string): string[] {
    const service = this.getServiceById(serviceId);

    if (!service) {
      throw new Error('Service not found');
    }

    const dayStart = new Date(`${dateIso}T00:00:00`);
    if (Number.isNaN(dayStart.getTime())) {
      throw new Error('Invalid date');
    }

    const start = new Date(dayStart);
    start.setHours(BUSINESS_START_HOUR, 0, 0, 0);

    const end = new Date(dayStart);
    end.setHours(BUSINESS_END_HOUR, 0, 0, 0);

    const durationMs = service.duration * 60 * 1000;
    const intervalMs = SLOT_INTERVAL_MINUTES * 60 * 1000;

    const availableSlots: string[] = [];

    for (let slot = new Date(start); slot.getTime() + durationMs <= end.getTime(); slot = new Date(slot.getTime() + intervalMs)) {
      const slotIso = slot.toISOString();
      if (this.isSlotAvailable(slotIso, therapistId, service.duration)) {
        availableSlots.push(slotIso);
      }
    }

    return availableSlots;
  },

  isSlotAvailable(dateIso: string, therapistId: string, durationMinutes: number, ignoreBookingId?: string): boolean {
    const slotStart = new Date(dateIso);
    const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

    return !bookings.some((booking) => {
      if (booking.therapistId !== therapistId) {
        return false;
      }

      if (ignoreBookingId && booking.id === ignoreBookingId) {
        return false;
      }

      if (booking.status === 'cancelled') {
        return false;
      }

      const bookingStart = new Date(booking.date);
      const service = this.getServiceById(booking.serviceId);
      const bookingDuration = service?.duration ?? durationMinutes;
      const bookingEnd = new Date(bookingStart.getTime() + bookingDuration * 60 * 1000);

      return slotStart < bookingEnd && slotEnd > bookingStart;
    });
  },
};

export type { Booking as BookingRecord };
