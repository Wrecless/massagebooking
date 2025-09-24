import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

export default function Home() {
  const [menuVisible, setMenuVisible] = useState<boolean>(false);
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-blue-600">Massage Booking</h1>
          </div>
          
          <div className="hidden md:block">
            <nav className="flex space-x-8">
              <Link href="/" className="text-gray-700 hover:text-blue-600 font-medium">
                Home
              </Link>
              <Link href="/booking-new" className="text-gray-700 hover:text-blue-600 font-medium">
                Book Now
              </Link>
              <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
                Services
              </Link>
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium">
                About Us
              </Link>
              <Link href="/admin" className="text-gray-700 hover:text-blue-600 font-medium">
                Admin
              </Link>
            </nav>
          </div>
          
          <div className="md:hidden">
            <button className="p-2" onClick={() => setMenuVisible(!menuVisible)}>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
              </svg>
            </button>
          </div>
        </div>
        
        {/* Mobile menu */}
        {menuVisible && (
          <div className="md:hidden bg-white shadow-lg">
            <nav className="px-4 py-2">
              <ul>
                <li className="py-2 border-b border-gray-100">
                  <Link href="/" className="block text-gray-700 hover:text-blue-600">
                    Home
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-100">
                  <Link href="/booking-new" className="block text-gray-700 hover:text-blue-600">
                    Book Now
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-100">
                  <Link href="/services" className="block text-gray-700 hover:text-blue-600">
                    Services
                  </Link>
                </li>
                <li className="py-2 border-b border-gray-100">
                  <Link href="/about" className="block text-gray-700 hover:text-blue-600">
                    About Us
                  </Link>
                </li>
                <li className="py-2">
                  <Link href="/admin" className="block text-gray-700 hover:text-blue-600">
                    Admin
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        )}
      </header>
      
      {/* Hero Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-6">
            Relax, Rejuvenate, Revitalize
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Experience the ultimate relaxation with our professional massage services. 
            Book your appointment today and give yourself the gift of wellness.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button 
              onClick={() => router.push('/booking-new')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg"
            >
              Book Now
            </button>
            <button 
              onClick={() => router.push('/services')}
              className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg border border-blue-600 text-lg"
            >
              View Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Services Preview */}
      <section className="py-12 bg-gray-50 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Service 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-blue-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Swedish Massage</h3>
                <p className="text-gray-600 mb-4">
                  A gentle form of massage that uses long strokes, kneading, deep circular movements, 
                  vibration and tapping to help relax and energize you.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$80</span>
                  <span className="text-gray-500">60 min</span>
                </div>
              </div>
            </div>
            
            {/* Service 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-green-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Deep Tissue Massage</h3>
                <p className="text-gray-600 mb-4">
                  A massage technique that focuses on the deeper layers of muscle tissue. 
                  It's designed to relieve severe tension in the muscle and the fascia.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$90</span>
                  <span className="text-gray-500">60 min</span>
                </div>
              </div>
            </div>
            
            {/* Service 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-48 bg-red-100"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Hot Stone Massage</h3>
                <p className="text-gray-600 mb-4">
                  A specialty massage where the therapist uses smooth, heated stones as an extension 
                  of their own hands, or by placing them on the body.
                </p>
                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold">$120</span>
                  <span className="text-gray-500">90 min</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="text-center mt-10">
            <button 
              onClick={() => router.push('/services')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              View All Services
            </button>
          </div>
        </div>
      </section>
      
      {/* Testimonials */}
      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">What Our Clients Say</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Testimonial 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The best massage I've ever had! The therapist was attentive to my needs and 
                the atmosphere was so relaxing. I'll definitely be coming back."
              </p>
            </div>
            
            {/* Testimonial 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Michael Brown</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "I had been experiencing back pain for months. After just one deep tissue massage, 
                I felt immediate relief. The booking process was also very easy and convenient."
              </p>
            </div>
            
            {/* Testimonial 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="flex items-center mb-4">
                <div className="h-12 w-12 rounded-full bg-gray-200"></div>
                <div className="ml-4">
                  <h4 className="font-semibold">Emily Wilson</h4>
                  <div className="flex text-yellow-400">
                    <span>★</span><span>★</span><span>★</span><span>★</span><span>★</span>
                  </div>
                </div>
              </div>
              <p className="text-gray-600">
                "The hot stone massage was incredible! The online booking system made it so easy 
                to schedule my appointment. I've already booked my next session!"
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-12 bg-blue-600 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to Experience the Best Massage?</h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Book your appointment today and take the first step towards relaxation and wellness.
          </p>
          <button 
            onClick={() => router.push('/booking-new')}
            className="bg-white hover:bg-gray-100 text-blue-600 font-bold py-3 px-8 rounded-lg text-lg"
          >
            Book Your Appointment
          </button>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8 px-4">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Massage Booking</h3>
            <p className="text-gray-300">
              Providing professional massage services to help you relax, 
              rejuvenate, and revitalize your body and mind.
            </p>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/booking-new" className="text-gray-300 hover:text-white">
                  Book Now
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-gray-300 hover:text-white">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <address className="text-gray-300 not-italic">
              <p>123 Relaxation Street</p>
              <p>Wellness City, WC 12345</p>
              <p className="mt-2">Phone: (123) 456-7890</p>
              <p>Email: info@massagebooking.com</p>
            </address>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto mt-8 pt-8 border-t border-gray-700 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} Massage Booking. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}