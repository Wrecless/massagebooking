import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';

interface Service {
  id: string;
  name: string;
  description: string;
  duration: number;
  price: number;
}

export default function Services() {
  const router = useRouter();
  const [services, setServices] = useState<Service[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchServices = async () => {
      setIsLoading(true);
      try {
        const response = await fetch('/api/services');
        if (!response.ok) {
          throw new Error('Failed to fetch services');
        }
        
        const data = await response.json();
        setServices(data);
        setError(null);
      } catch (err) {
        console.error('Error fetching services:', err);
        setError('Failed to load services. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchServices();
  }, []);

  // Background colors for service cards
  const bgColors = [
    'bg-blue-100',
    'bg-green-100',
    'bg-red-100',
    'bg-yellow-100',
    'bg-purple-100',
    'bg-pink-100',
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <Link href="/" className="text-2xl font-bold text-blue-600">
              Massage Booking
            </Link>
          </div>
          
          <nav className="hidden md:flex space-x-8">
            <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
              Home
            </Link>
            <Link href="/booking-new" className="text-gray-700 hover:text-blue-600 font-medium">
              Book Now
            </Link>
            <Link href="/services" className="text-blue-600 font-medium">
              Services
            </Link>
            <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
              About Us
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">Our Services</h1>
        
        {isLoading ? (
          <div className="text-center py-10">
            <p className="text-xl text-gray-600">Loading services...</p>
          </div>
        ) : error ? (
          <div className="text-center py-10">
            <p className="text-xl text-red-600">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Try Again
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div key={service.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className={`h-48 ${bgColors[index % bgColors.length]}`}></div>
                <div className="p-6">
                  <h2 className="text-2xl font-semibold mb-2">{service.name}</h2>
                  <p className="text-gray-600 mb-4">{service.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-lg font-bold">${service.price}</span>
                    <span className="text-gray-500">{service.duration} min</span>
                  </div>
                  <button
                    onClick={() => router.push({
                      pathname: '/booking-new',
                      query: { serviceId: service.id }
                    })}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Book This Service
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
        
        {/* Benefits Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Benefits of Massage Therapy</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Stress Reduction</h3>
              <p className="text-gray-600">
                Massage therapy helps reduce stress and promotes relaxation, which can improve your overall mental health.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Pain Relief</h3>
              <p className="text-gray-600">
                Regular massage therapy can help reduce pain, muscle soreness, and stiffness in your body.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Improved Circulation</h3>
              <p className="text-gray-600">
                Massage improves blood circulation, which delivers oxygen and nutrients to your cells.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Better Sleep</h3>
              <p className="text-gray-600">
                Massage therapy can help improve sleep quality and treat insomnia by promoting relaxation.
              </p>
            </div>
          </div>
        </section>
        
        {/* FAQ Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-center mb-8">Frequently Asked Questions</h2>
          
          <div className="space-y-6 max-w-3xl mx-auto">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">How often should I get a massage?</h3>
              <p className="text-gray-600">
                It depends on your needs and preferences. For general wellness, once a month is a good starting point. 
                For specific conditions or chronic pain, weekly sessions might be recommended initially.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">What should I do before a massage?</h3>
              <p className="text-gray-600">
                Avoid eating a heavy meal right before your appointment. Arrive 10-15 minutes early to complete any paperwork. 
                Be ready to discuss any health concerns or preferences with your therapist.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">What should I wear during a massage?</h3>
              <p className="text-gray-600">
                You'll be properly draped during the session. Undress to your comfort level. Many clients prefer to remove most clothing, 
                but you can keep underwear on if you prefer. The therapist will leave the room while you undress and get on the table.
              </p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold mb-2">How do I choose the right massage type?</h3>
              <p className="text-gray-600">
                Consider your goals: relaxation, pain relief, or stress reduction. Swedish massage is great for beginners and relaxation. 
                Deep tissue is better for chronic pain. If you're unsure, our therapists can help recommend the best option for your needs.
              </p>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="mt-16 bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Experience Our Services?</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Book your appointment today and take the first step towards relaxation and wellness.
          </p>
          <button 
            onClick={() => router.push('/booking-new')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg"
          >
            Book Your Appointment
          </button>
        </section>
      </main>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4 mt-16">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <p>&copy; {new Date().getFullYear()} Massage Booking. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}