import Link from 'next/link';
import { useRouter } from 'next/router';

export default function About() {
  const router = useRouter();

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
            <Link href="/services" className="text-gray-700 hover:text-blue-600 font-medium">
              Services
            </Link>
            <Link href="/about" className="text-blue-600 font-medium">
              About Us
            </Link>
          </nav>
        </div>
      </header>
      
      {/* Main Content */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-center mb-12">About Us</h1>
        
        {/* Our Story Section */}
        <section className="mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Our Story</h2>
              <p className="text-lg text-gray-600 mb-4">
                Massage Booking was founded in 2020 with a simple mission: to make professional massage therapy 
                accessible to everyone. What started as a small studio with just two therapists has grown into 
                a wellness center with a team of certified professionals dedicated to helping our clients 
                achieve optimal health and relaxation.
              </p>
              <p className="text-lg text-gray-600">
                We believe that regular massage therapy is not a luxury, but an essential component of a 
                healthy lifestyle. Our booking system was designed to make scheduling appointments as 
                stress-free as possible, allowing you to focus on what matters most - your wellbeing.
              </p>
            </div>
            <div className="bg-blue-100 h-80 rounded-lg"></div>
          </div>
        </section>
        
        {/* Our Mission Section */}
        <section className="mb-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-3xl font-bold text-center mb-6">Our Mission</h2>
          <p className="text-xl text-gray-600 text-center max-w-3xl mx-auto">
            To provide exceptional massage therapy services that promote health, wellness, and relaxation 
            in a comfortable environment, while making the booking process simple and convenient for our clients.
          </p>
        </section>
        
        {/* Meet Our Team Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Meet Our Team</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Therapist 1 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Jane Smith</h3>
                <p className="text-gray-500 mb-4">Lead Massage Therapist</p>
                <p className="text-gray-600">
                  Jane has 10+ years of experience in various massage techniques, specializing in Swedish 
                  and Deep Tissue massage. She is dedicated to helping clients achieve relaxation and pain relief.
                </p>
              </div>
            </div>
            
            {/* Therapist 2 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">John Davis</h3>
                <p className="text-gray-500 mb-4">Senior Massage Therapist</p>
                <p className="text-gray-600">
                  John is certified in Hot Stone and Aromatherapy massage with 5 years of experience in luxury spas. 
                  His approach combines traditional techniques with modern wellness practices.
                </p>
              </div>
            </div>
            
            {/* Therapist 3 */}
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <div className="h-64 bg-gray-200"></div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">Sarah Johnson</h3>
                <p className="text-gray-500 mb-4">Sports Massage Specialist</p>
                <p className="text-gray-600">
                  Sarah specializes in sports massage and rehabilitation therapy, helping athletes recover from injuries. 
                  She has worked with professional sports teams and individual athletes.
                </p>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Value 1 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Excellence</h3>
              <p className="text-gray-600">
                We strive for excellence in every massage session, ensuring that each client receives the highest quality care.
              </p>
            </div>
            
            {/* Value 2 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-green-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Client-Centered</h3>
              <p className="text-gray-600">
                We put our clients' needs first, customizing each massage to address their specific concerns and preferences.
              </p>
            </div>
            
            {/* Value 3 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-red-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Continuous Learning</h3>
              <p className="text-gray-600">
                Our therapists regularly update their skills and knowledge to provide the most effective massage techniques.
              </p>
            </div>
            
            {/* Value 4 */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="h-12 w-12 rounded-full bg-yellow-100 flex items-center justify-center mb-4">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-yellow-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Convenience</h3>
              <p className="text-gray-600">
                We make booking appointments easy and convenient, respecting our clients' time and schedules.
              </p>
            </div>
          </div>
        </section>
        
        {/* Location Section */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Our Location</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="bg-gray-200 h-80 rounded-lg"></div>
            <div>
              <h3 className="text-2xl font-semibold mb-4">Visit Our Studio</h3>
              <address className="text-lg text-gray-600 not-italic mb-6">
                <p>123 Relaxation Street</p>
                <p>Wellness City, WC 12345</p>
                <p className="mt-2">Phone: (123) 456-7890</p>
                <p>Email: info@massagebooking.com</p>
              </address>
              
              <h4 className="text-xl font-semibold mb-2">Hours of Operation</h4>
              <ul className="text-gray-600">
                <li>Monday - Friday: 9:00 AM - 8:00 PM</li>
                <li>Saturday: 10:00 AM - 6:00 PM</li>
                <li>Sunday: 12:00 PM - 5:00 PM</li>
              </ul>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="bg-blue-600 rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Experience Our Services Today</h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Book your appointment now and discover the difference our professional massage therapy can make.
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