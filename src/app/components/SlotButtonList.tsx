"use client";
import React from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { convertToContextualFormat } from '../../../utils/common';
import { toast } from 'react-toastify';

export const SlotButtonList = ({ slots }) => {

    const { isLoggedIn, loggedInId, authToken } = useAuth();
    const router = useRouter();


    const bookAppointment = async (slotId) => {

        if (!isLoggedIn) {
            router.push('/login');
            return;
        }


        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/book-appointment';

        const formData = {
            user_id: loggedInId,
            time_slot_id: slotId,
        };

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${authToken}`
                },
                body: JSON.stringify(formData)
            });
            // toast("Response received");
            const data = await response.json();

            if (data.data?.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            // Handle response

            // }  
        } catch (error) {
            // Handle errors (e.g., show an error message)
            console.error("Failed to book appointment:", error);
        }



    }


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
