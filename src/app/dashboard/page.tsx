"use client";

import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import useAuthRedirect from '../../hooks/useAuthRedirect';
import Dashboard from '../components/Dashboard';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';

export default function DashboardPage() {
  useAuthRedirect();
  return (
    <Dashboard title='Dashboard'>
      <Grid container spacing={3}>
        {/* Chart */}
        <Grid item xs={12} md={8} lg={9}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            {/* <Chart /> */}
          </Paper>
        </Grid>
        {/* Recent Deposits */}
        <Grid item xs={12} md={4} lg={3}>
          <Paper
            sx={{
              p: 2,
              display: 'flex',
              flexDirection: 'column',
              height: 240,
            }}
          >
            {/* <Deposits /> */}
          </Paper>
        </Grid>
        {/* Recent Orders */}
        <Grid item xs={12}>
          <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
            {/* <Orders /> */}
          </Paper>
        </Grid>
      </Grid>
      
    </Dashboard>
  );
}
