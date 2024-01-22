import React from 'react';
import Button from '@mui/material/Button';


const convertTo12HourFormat = (time) => {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const suffix = hour >= 12 ? "PM" : "AM";
    const newHour = hour > 12 ? hour - 12 : (hour === 0 ? 12 : hour);
    return `${newHour}:${minutes} ${suffix}`;
};

const convertToReadableFormat = (dateStr) => {
    const date = new Date(dateStr);
    const options = {
        weekday: 'short',
        hour: 'numeric',
        hour12: true
    };
    return new Intl.DateTimeFormat('en-US', options).format(date);
}

const convertToContextualFormat = (dateStr) => {
    const date = new Date(dateStr);
    const now = new Date();

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    });

    const timePart = dateFormatter.format(date);

    if (date.toDateString() === now.toDateString()) {
        return `Today ${timePart}`;
    }

    now.setDate(now.getDate() + 1);
    if (date.toDateString() === now.toDateString()) {
        return `Tom ${timePart}`;
    }

    const dayFormatter = new Intl.DateTimeFormat('en-US', {
        weekday: 'long'
    });

    return `${dayFormatter.format(date)} ${timePart}`;
}

const SlotButtonList = ({ slots }) => {
    return (
        <div className="flex overflow-x-auto space-x-2 p-2">
            {slots.map((slot) => (
                <Button
                    key={slot.id}
                    variant="outlined"
                    className="min-w-max whitespace-nowrap"
                >
                    {convertToContextualFormat(slot.start_time)}
                </Button>
            ))}
        </div>
    );
};

export default SlotButtonList;
