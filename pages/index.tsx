import Head from 'next/head';
import Link from 'next/link';

const features = [
  {
    title: 'Licensed Therapists',
    description: 'Every practitioner is fully certified and specialised in a range of restorative treatments.',
  },
  {
    title: 'Tailored Treatments',
    description: 'Select the service, therapist, date, and time that suits your body and schedule best.',
  },
  {
    title: 'Secure & Seamless',
    description: 'Our modern booking flow keeps your data safe while reserving appointments in seconds.',
  },
];

export default function Home() {
  return (
    <>
      <Head>
        <title>Serenity Massage Studio</title>
        <meta
          name="description"
          content="Book rejuvenating massage appointments with licensed therapists in just a few clicks."
        />
      </Head>

      <div className="min-h-screen bg-gradient-to-b from-blue-50 via-white to-white">
        <header className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
          <div className="text-2xl font-bold text-blue-700">Serenity</div>
          <nav className="hidden space-x-6 text-sm font-medium text-gray-700 md:flex">
            <Link href="/services" className="hover:text-blue-600">
              Services
            </Link>
            <Link href="/about" className="hover:text-blue-600">
              About
            </Link>
            <Link href="/admin" className="hover:text-blue-600">
              Admin
            </Link>
          </nav>
          <Link
            href="/booking-new"
            className="rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-blue-600/30 transition hover:bg-blue-700"
          >
            Book now
          </Link>
        </header>

        <main className="mx-auto flex max-w-6xl flex-col gap-16 px-6 pb-16 pt-12 md:flex-row md:items-center">
          <div className="flex-1 space-y-6">
            <p className="inline-flex items-center rounded-full bg-blue-100 px-4 py-1 text-xs font-semibold uppercase tracking-wide text-blue-800">
              Restore. Relax. Renew.
            </p>
            <h1 className="text-4xl font-bold text-gray-900 md:text-5xl">
              Reserve a personalised massage in minutes
            </h1>
            <p className="text-lg text-gray-600">
              Choose your preferred service, therapist, and appointment time. Our real-time availability keeps your schedule
              organised and ensures every visit is effortless.
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                href="/booking-new"
                className="inline-flex items-center justify-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white shadow-md transition hover:bg-blue-700"
              >
                Start booking
              </Link>
              <Link
                href="/services"
                className="inline-flex items-center justify-center rounded-full border border-blue-200 px-6 py-3 font-semibold text-blue-700 transition hover:border-blue-400 hover:text-blue-800"
              >
                Explore services
              </Link>
            </div>
          </div>

          <div className="flex-1">
            <div className="rounded-3xl bg-white p-6 shadow-xl shadow-blue-100">
              <div className="space-y-4">
                <h2 className="text-lg font-semibold text-gray-900">Next available appointments</h2>
                <div className="space-y-3 text-sm text-gray-600">
                  <p>
                    <span className="font-medium text-gray-900">Swedish Massage</span> — today at 3:00 PM with Jane Smith
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Deep Tissue</span> — tomorrow at 10:00 AM with Sarah Johnson
                  </p>
                  <p>
                    <span className="font-medium text-gray-900">Hot Stone</span> — Thursday at 4:00 PM with John Davis
                  </p>
                </div>
                <Link href="/booking-new" className="mt-4 inline-flex text-sm font-semibold text-blue-600 hover:text-blue-700">
                  View schedule →
                </Link>
              </div>
            </div>
          </div>
        </main>

        <section className="bg-white py-16">
          <div className="mx-auto max-w-6xl px-6">
            <h2 className="text-center text-3xl font-bold text-gray-900">Why guests choose Serenity</h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {features.map((feature) => (
                <div key={feature.title} className="rounded-2xl border border-gray-100 bg-gray-50 p-6 shadow-sm">
                  <h3 className="text-xl font-semibold text-gray-900">{feature.title}</h3>
                  <p className="mt-3 text-sm text-gray-600">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

