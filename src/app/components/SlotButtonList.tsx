"use client";
import React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

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
        weekday: 'short'
    });

    return `${dayFormatter.format(date)} ${timePart}`;
}

export const SlotButtonList = ({ slots }) => {

    const { isLoggedIn } = useAuth();
    const router = useRouter();


    const bookAppointment = async (slotId) => {

        if (!isLoggedIn) {
            router.push('/login');
        }
        try {
            // API request to update the time slot as booked
            // This is just a placeholder, you'll need to replace it with your actual API request
            // await fetch(`/api/book-appointment/${slotId}`, { method: 'POST' });

            // Handle successful booking (e.g., show a confirmation message)
            console.log("Appointment booked successfully!", slotId);
            console.log("is user logged in", isLoggedIn);

            // Optionally, you might want to refresh the slots list to reflect the booked slot
        } catch (error) {
            // Handle any errors that occur during the booking process
            console.error("Failed to book appointment:", error);
        }
    };


    return (
        <div className="flex overflow-x-auto space-x-2 p-2">
            {slots.map((slot) => (
                <Button
                    key={slot.id}
                    variant="outlined"
                    className="min-w-max whitespace-nowrap"
                    onClick={() => bookAppointment(slot.id)}
                >
                    {convertToContextualFormat(slot.start_time)}
                </Button>
            ))}
        </div>
    );
};

export default SlotButtonList;
