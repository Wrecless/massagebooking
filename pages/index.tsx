import { useState } from 'react';
import Link from 'next/link';

export default function Home() {
    const [menuVisible, setMenuVisible] = useState<boolean>(false);

    return (
        <>
            <div>
                <h1 className="Title text-center font-semibold text-3xl">Welcome to Home Page</h1>
            </div>
            <div className="p-8 flex">
                <div className="mr-8">
                    <button className="p-2" onClick={() => setMenuVisible(!menuVisible)}>
                        {/* SVG for the hamburger icon */}
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="h-6 w-6">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path>
                        </svg>
                    </button>

                    {menuVisible && (
                        <div className="mt-4 bg-gray-100 rounded p-4">
                            <ul>
                                <li className="mb-2">
                                    <Link href="/" className="text-gray-700 hover:font-bold">
                                        Home
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/booking" className="text-gray-700 hover:font-bold">
                                        Booking
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="/booking2" className="text-gray-700 hover:font-bold">
                                        Booking2
                                    </Link>
                                </li>
                                <li className="mb-2">
                                    <Link href="#" className="text-gray-700 hover:font-bold">
                                        Benefits
                                    </Link>
                                </li>
                                <li>
                                    <Link href="#" className="text-gray-700 hover:font-bold">
                                        About Us
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}

