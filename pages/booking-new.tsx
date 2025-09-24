import { useState, useEffect } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { useRouter } from 'next/router';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

interface Therapist {
  id: string;
  name: string;
  bio: string;
  specialties: string[];
  image: string;
}

interface TimeSlot {
  time: Date;
  available: boolean;
}

export default function BookingNew() {
  const router = useRouter();
  
  // State variables
  const [services, setServices] = useState<Service[]>([]);
  const [therapists, setTherapists] = useState<Therapist[]>([]);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedTherapist, setSelectedTherapist] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [availableSlots, setAvailableSlots] = useState<string[]>([]);
  const [userInfo, setUserInfo] = useState({
    name: '',
    email: '',
    phone: ''
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [bookingConfirmed, setBookingConfirmed] = useState<boolean>(false);
  const [bookingId, setBookingId] = useState<string | null>(null);

  // Fetch services and therapists on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch services
        const servicesResponse = await fetch('/api/services');
        const servicesData = await servicesResponse.json();
        setServices(servicesData);
        
        // Fetch therapists
        const therapistsResponse = await fetch('/api/therapists');
        const therapistsData = await therapistsResponse.json();
        setTherapists(therapistsData);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load services and therapists. Please try again.');
      }
    };
    
    fetchData();
  }, []);

  // Fetch available slots when date or therapist changes
  useEffect(() => {
    if (selectedDate && selectedTherapist) {
      fetchAvailableSlots();
    }
  }, [selectedDate, selectedTherapist]);

  const fetchAvailableSlots = async () => {
    setIsLoading(true);
    try {
      const dateString = selectedDate.toISOString().split('T')[0];
      const response = await fetch(
        `/api/bookings/available-slots?date=${dateString}&therapistId=${selectedTherapist}`
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch available slots');
      }
      
      const data = await response.json();
      setAvailableSlots(data.availableSlots);
      setError(null);
    } catch (err) {
      console.error('Error fetching available slots:', err);
      setError('Failed to fetch available time slots. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBooking = async () => {
    if (!selectedService || !selectedTherapist || !selectedDate || !selectedTime) {
      setError('Please select all required booking details');
      return;
    }
    
    if (!userInfo.name || !userInfo.email) {
      setError('Please provide your name and email');
      return;
    }
    
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          date: selectedTime,
          serviceId: selectedService,
          therapistId: selectedTherapist,
          userName: userInfo.name,
          userEmail: userInfo.email,
          userPhone: userInfo.phone
        }),
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to create booking');
      }
      
      const bookingData = await response.json();
      setBookingId(bookingData.id);
      setBookingConfirmed(true);
      setError(null);
    } catch (err: any) {
      console.error('Error creating booking:', err);
      setError(err.message || 'Failed to create booking. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Format time for display
  const formatTime = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (bookingConfirmed) {
    return (
      <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Booking Confirmed!</h2>
        <p>Thank you for booking with us, {userInfo.name}.</p>
        <p className="mt-2">
          Your {services.find(s => s.id === selectedService)?.name} is scheduled for{' '}
          {selectedDate.toLocaleDateString()} at {formatTime(selectedTime || '')}.
        </p>
        <p className="mt-4">A confirmation email has been sent to {userInfo.email}.</p>
        <p className="mt-2">Your booking reference number is: {bookingId}</p>
        <button
          onClick={() => router.push('/')}
          className="mt-6 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Return to Home
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto mt-10 p-6 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold mb-6">Book Your Massage</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-4">1. Select Service</h2>
          <div className="space-y-2">
            {services.map(service => (
              <div 
                key={service.id}
                className={`p-4 border rounded cursor-pointer ${
                  selectedService === service.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedService(service.id)}
              >
                <div className="font-medium">{service.name}</div>
                <div className="text-sm text-gray-500">{service.duration} min - ${service.price}</div>
                <div className="text-sm mt-1">{service.description}</div>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">2. Select Therapist</h2>
          <div className="space-y-2">
            {therapists.map(therapist => (
              <div 
                key={therapist.id}
                className={`p-4 border rounded cursor-pointer ${
                  selectedTherapist === therapist.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                }`}
                onClick={() => setSelectedTherapist(therapist.id)}
              >
                <div className="font-medium">{therapist.name}</div>
                <div className="text-sm mt-1">{therapist.bio}</div>
                <div className="text-sm text-gray-500 mt-1">
                  Specialties: {therapist.specialties.join(', ')}
                </div>
              </div>
            ))}
          </div>
          
          <h2 className="text-xl font-semibold mt-6 mb-4">3. Your Information</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={userInfo.name}
                onChange={(e) => setUserInfo({...userInfo, name: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={userInfo.email}
                onChange={(e) => setUserInfo({...userInfo, email: e.target.value})}
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Phone</label>
              <input
                type="tel"
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm p-2"
                value={userInfo.phone}
                onChange={(e) => setUserInfo({...userInfo, phone: e.target.value})}
              />
            </div>
          </div>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-4">4. Select Date & Time</h2>
          <DatePicker
            selected={selectedDate}
            onChange={(date: Date) => setSelectedDate(date)}
            inline
            minDate={new Date()}
            className="w-full"
          />
          
          <h3 className="font-medium mt-4 mb-2">Available Times</h3>
          {isLoading ? (
            <div className="text-center py-4">Loading available slots...</div>
          ) : availableSlots.length > 0 ? (
            <div className="grid grid-cols-3 gap-2">
              {availableSlots.map((slot, index) => (
                <button
                  key={index}
                  className={`p-2 text-sm border rounded ${
                    selectedTime === slot
                      ? 'bg-blue-500 text-white'
                      : 'hover:bg-gray-100'
                  }`}
                  onClick={() => setSelectedTime(slot)}
                >
                  {formatTime(slot)}
                </button>
              ))}
            </div>
          ) : (
            <div className="text-center py-4 text-gray-500">
              {selectedTherapist
                ? 'No available slots for the selected date'
                : 'Please select a therapist to see available times'}
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-8">
        <button
          onClick={handleBooking}
          disabled={isLoading || !selectedService || !selectedTherapist || !selectedDate || !selectedTime || !userInfo.name || !userInfo.email}
          className={`w-full py-3 px-4 rounded-md font-medium text-white ${
            isLoading || !selectedService || !selectedTherapist || !selectedDate || !selectedTime || !userInfo.name || !userInfo.email
              ? 'bg-gray-400 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-700'
          }`}
        >
          {isLoading ? 'Processing...' : 'Confirm Booking'}
        </button>
      </div>
    </div>
  );
}