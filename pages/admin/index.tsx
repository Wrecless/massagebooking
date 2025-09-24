import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

interface Booking {
  id: string;
  date: string;
  userName: string;
  userEmail: string;
  userPhone: string;
  serviceName: string;
  serviceDuration: number;
  servicePrice: number;
  therapistName: string;
  status: string;
}

export default function AdminDashboard() {
  const router = useRouter();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [filter, setFilter] = useState<string>('all'); // 'all', 'confirmed', 'cancelled'

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    setIsLoading(true);
    try {
      const response = await fetch('/api/bookings');
      if (!response.ok) {
        throw new Error('Failed to fetch bookings');
      }
      
      const data = await response.json();
      setBookings(data);
      setError(null);
    } catch (err) {
      console.error('Error fetching bookings:', err);
      setError('Failed to load bookings. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (bookingId: string, newStatus: string) => {
    try {
      const response = await fetch(`/api/bookings/${bookingId}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      });
      
      if (!response.ok) {
        throw new Error('Failed to update booking status');
      }
      
      // Update the booking in the local state
      setBookings(bookings.map(booking => 
        booking.id === bookingId ? { ...booking, status: newStatus } : booking
      ));
    } catch (err) {
      console.error('Error updating booking status:', err);
      setError('Failed to update booking status. Please try again.');
    }
  };

  const filteredBookings = filter === 'all' 
    ? bookings 
    : bookings.filter(booking => booking.status === filter);

  // Format date for display
  const formatDate = (isoString: string) => {
    const date = new Date(isoString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
        <div className="text-center py-10">Loading bookings...</div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <div className="mb-4 flex justify-between items-center">
        <div>
          <label htmlFor="filter" className="mr-2">Filter by status:</label>
          <select
            id="filter"
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="border rounded p-2"
          >
            <option value="all">All Bookings</option>
            <option value="confirmed">Confirmed</option>
            <option value="cancelled">Cancelled</option>
            <option value="completed">Completed</option>
          </select>
        </div>
        
        <button
          onClick={fetchBookings}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Refresh
        </button>
      </div>
      
      <div className="bg-white shadow-md rounded-lg overflow-hidden">
        {filteredBookings.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Date & Time
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Client
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Service
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Therapist
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredBookings.map((booking) => (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {formatDate(booking.date)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="font-medium text-gray-900">{booking.userName}</div>
                      <div className="text-sm text-gray-500">{booking.userEmail}</div>
                      {booking.userPhone && (
                        <div className="text-sm text-gray-500">{booking.userPhone}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div>{booking.serviceName}</div>
                      <div className="text-sm text-gray-500">
                        {booking.serviceDuration} min - ${booking.servicePrice}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.therapistName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed' ? 'bg-green-100 text-green-800' :
                        booking.status === 'cancelled' ? 'bg-red-100 text-red-800' :
                        booking.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                      <select
                        value={booking.status}
                        onChange={(e) => handleStatusChange(booking.id, e.target.value)}
                        className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                      >
                        <option value="confirmed">Confirmed</option>
                        <option value="cancelled">Cancelled</option>
                        <option value="completed">Completed</option>
                      </select>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-10 text-gray-500">
            No bookings found for the selected filter.
          </div>
        )}
      </div>
    </div>
  );
}