import React, { useState } from 'react';
import Datepicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

export default function Booking2() {
    const [selectedDate, setSelectedDate] = useState<Date | null>(new Date());

    const handleDateChange = (date: Date | [Date, Date] | null) => {
        setSelectedDate(date as Date);
    };

    const dayClassNames = (date: Date) => {
        const dateString = date.toISOString().split('T')[0];
        if (dateString === '2023-09-04') {
            return 'special-day';
        }
        return '';
    };

    const minTimeDate = new Date();
    minTimeDate.setHours(8, 0);

    const maxTimeDate = new Date();
    maxTimeDate.setHours(19, 59);

    return (
        <div>
            <Datepicker
                className="text-xl"
                inline
                selected={selectedDate}
                onChange={handleDateChange}
                showTimeSelect
                timeFormat="HH:mm"
                timeIntervals={60}
                timeCaption="Time"
                dateFormat="MMMM d, yyyy h:mm aa"
                minDate={new Date('2023-09-05T00:00')}
                maxDate={new Date('2024-03-05T00:00')}
                minTime={minTimeDate}
                maxTime={maxTimeDate}
                dayClassName={dayClassNames}
            />
        </div>
    );
}
