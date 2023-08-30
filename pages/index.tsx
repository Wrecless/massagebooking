import { useState } from 'react';

export default function Home() {
    const [bookedSlots, setBookedSlots] = useState<{ date: number; time: string }[]>([]);
    const [selectedDate, setSelectedDate] = useState<number | null>(null);
    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [currentMonth, setCurrentMonth] = useState<number>(8); // Starting with August as an example
    const [currentYear, setCurrentYear] = useState<number>(2023);


    const daysInMonth = new Date(currentYear, currentMonth, 0).getDate();


    const isSlotBooked = (day: number, time: string) => {
        return bookedSlots.some(slot => slot.date === day && slot.time === time);
    };

    const changeMonth = (direction: number) => {
        let newMonth = currentMonth + direction;
        let newYear = currentYear;

        if (newMonth > 12) {
            newMonth = 1;
            newYear++;
        } else if (newMonth < 1) {
            newMonth = 12;
            newYear--;
        }

        setCurrentMonth(newMonth);
        setCurrentYear(newYear);
    };


    return (
        <div className="p-8">
            <h1 className="text-2xl mb-4">Booking Calendar</h1>
            <div className="Month_Selected text-xl flex justify-center pb-2">{currentMonth}/{currentYear}</div>
            <div className="calendarMonth pb-8 grid grid-cols-7 gap-4">
                {[...Array(daysInMonth)].map((_, i) => (
                    <div
                        key={i}
                        className="day p-4 border border-gray-300 text-center cursor-pointer hover:bg-gray-200"
                        onClick={() => setSelectedDate(i + 1)}
                    >
                        {i + 1}
                    </div>
                ))}
            </div>
            <div className="flex justify-between items-center mb-4">
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => changeMonth(-1)}>Previous Month</button>
                {selectedDate && <div className="Current_Date text-xl mb-4">Selected Date: {selectedDate}/08/2023</div>}

                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={() => changeMonth(1)}>Next Month</button>
            </div>
            {selectedDate && (
                <div className="mt-4">
                    {['10 am', '1 pm', '3 pm'].map(time => (
                        <button
                            key={time}
                            className={`mr-2 mt-2 px-4 py-2 bg-gray-300 hover:bg-gray-400 ${isSlotBooked(selectedDate, time) ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                            disabled={isSlotBooked(selectedDate, time)}
                            onClick={() => setSelectedTime(time)}
                        >
                            {time}
                        </button>
                    ))}
                </div>
            )}
            <button onClick={() => {
                if (selectedDate && selectedTime) {
                    setBookedSlots([...bookedSlots, { date: selectedDate, time: selectedTime }]);
                    setSelectedDate(null);
                    setSelectedTime(null);
                }
            }} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Book Selected Slot
            </button>
        </div>
    );
}
