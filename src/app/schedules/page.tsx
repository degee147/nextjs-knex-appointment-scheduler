"use client";

import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Dashboard from '../components/Dashboard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import CircularProgress from '@mui/material/CircularProgress';
import Modal from '@mui/material/Modal';
import { convertToContextualFormat } from '../../../utils/common';

import Box from '@mui/material/Box';

import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

interface Event {
  title: string;
  start: string;
}

export default function SchedulesPage() {
  useAuthRedirect();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

  const [isLoading, setIsLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { isLoggedIn, loggedInId, authToken, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    const fetchEvents = async () => {
      try {

        setIsLoading(true);
        const authToken = await localStorage.getItem('authToken');
        const user_id = await localStorage.getItem('user_id');

        if (!authToken || !user_id || !isLoggedIn) {
          toast("Session Expired. Please login");
          logout();
          router.push('/login');
          setIsLoading(false);
          return;
        }

        const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/users/' + user_id + '/appointments';
        const response = await fetch(apiUrl, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          }
        });
        if (!response.ok) {
          setIsLoading(false);
          toast('No appointment schedules at the moment');
          return;
        }

        const data = await response.json();
        setIsLoading(false);
        if (data.data?.success) {
          setEvents(data.data.appointments);
        } else {
          toast.error(data.message);
        }


      } catch (error) {
        console.error('Error fetching events:', error);
      }
    };


    fetchEvents();

  }, []);

  const renderEventContent = async (eventInfo: any) => {
    // console.log("eventInfo", eventInfo);

    return (
      <>
        <b>{eventInfo.timeText}</b> &nbsp;
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const handleEventClick = (clickInfo: any) => {
    setSelectedEvent(clickInfo.event);
    setIsModalOpen(true);
  };



  return (
    <Dashboard title='Schedules'>
      <Grid container spacing={3}>

        <Modal
          open={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <div> {/* Modal content */}
              {selectedEvent && (
                <div>
                  <h1>Meeting with {selectedEvent.title}</h1>
                  <p>{convertToContextualFormat(selectedEvent.start)}</p>
                  <p>Further event details, like zoom link..</p>
                  {/* Add more event details here */}
                </div>
              )}
            </div>
          </Box>
        </Modal>

        <Grid item xs={12} md={12} lg={12}>
          <Paper
            sx={{
              p: 5,
            }}
          >

            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
                <CircularProgress />
              </div>
            ) : (
              <>
                <FullCalendar
                  plugins={[dayGridPlugin]}
                  initialView='dayGridMonth'
                  weekends={true}
                  events={events}
                  eventContent={renderEventContent}
                  eventClick={handleEventClick}
                />
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Dashboard>

  );
}
