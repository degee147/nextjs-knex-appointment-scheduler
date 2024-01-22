"use client";
import React, { useState } from 'react';
import Button from '@mui/material/Button';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { convertToContextualFormat } from '../../../utils/common';
import CircularProgress from '@mui/material/CircularProgress';
import { toast } from 'react-toastify';
import { Provider, TimeSlot } from '@/@types';
import Box from '@mui/material/Box';


interface SlotButtonListProps {
    slots: TimeSlot[];
}

export const SlotButtonList = ({ slots }: SlotButtonListProps) => {

    const [isLoading, setIsLoading] = useState(false);
    const { isLoggedIn, loggedInId, authToken } = useAuth();
    const router = useRouter();


    const bookAppointment = async (slotId: any) => {
        setIsLoading(true);

        let user_id: any = loggedInId;
        if (!isLoggedIn) {
            setIsLoading(false);
            toast("Please login to proceed");
            router.push('/login');
            return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/book-appointment';
        if (!user_id || user_id == "") {
            user_id = await localStorage.getItem('user_id');
            if (!user_id) {
                toast("Please login to proceed");
                setIsLoading(false);
                router.push('/login');
                return;
            }
        }

        const formData = {
            user_id: user_id,
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
            setIsLoading(false);

            if (data.data?.success) {
                toast.success(data.message);
            } else {
                toast.error(data.message);
            }

            // Handle response

            // }  
        } catch (error) {
            setIsLoading(false);
            // Handle errors (e.g., show an error message)
            console.error("Failed to book appointment:", error);
        }
    }


    return (
        // <div className="flex overflow-x-auto space-x-2 p-2">
        <Box sx={{ overflowX: 'auto' }} className="flex w-full p-2">
            {slots.map((slot) => (
                <Button
                    key={slot.id}
                    variant="outlined"
                    className="min-w-max whitespace-nowrap mr-2"
                    onClick={() => bookAppointment(slot.id)}
                >
                    {isLoading ? (
                        <CircularProgress size={24} color="inherit" />
                    ) : (
                        convertToContextualFormat(slot.start_time)
                    )}
                </Button>

            ))}
            {/* </div> */}
        </Box>
    );
};

export default SlotButtonList;
