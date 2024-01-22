"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Dashboard from '../components/Dashboard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { Booking } from "../components/Booking";

export default function BookAppointmentPage() {
  useAuthRedirect();
  return (
    <Dashboard title='Book Appointment'>
      <Grid container spacing={6}>
        {/* Chart */}
        <Grid item xs={12} md={12} lg={12}>
          {/* <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              // height: 240,
            }}
          > */}
            {/* <Chart /> */}
            <Booking/>
          {/* </Paper> */}
        </Grid>

      </Grid>

    </Dashboard>
  );
}
