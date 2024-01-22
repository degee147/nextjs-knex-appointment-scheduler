"use client";

import Image from "next/image";
import React, { useState } from 'react';
import PractitionerCard from './components/PractitionerCard';
import { Grid } from '@mui/material';
import { faker } from '@faker-js/faker';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';

import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

export default function Home() {
  const [practitioners, setPractitioners] = useState([
    // Dummy data, replace with actual data
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    { name: "Dr. Smith", specialization: "Cardiology", image: faker.image.avatar(), availableSlots: ["9:00 AM", "11:00 AM"] },
    // More practitioners...
  ]);

  const handleDateTimeChange = (dateTime) => {
    // Handle the date-time change, maybe fetch available practitioners
  };
  const handleChange = (dateTime) => {
    // Handle the date-time change, maybe fetch available practitioners
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <LocalizationProvider dateAdapter={AdapterMoment}>
        {/* <Typography variant="h3" component="div">
        Select your doctor and appointment time
      </Typography> */}
        <h2>Select your doctor and appointment time</h2>
        <div className="grid grid-cols-2">
          {/* Content for row 1 */}
          <div className="p-1">
            <h3>Date</h3>
            <DatePicker />
          </div>
          <div className="p-1">
            <h3>Specialization</h3>
            <FormControl fullWidth>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                // value={age}
                label="Specialization"
                onChange={handleChange}
              >
                <MenuItem value={10}>Ten</MenuItem>
                <MenuItem value={20}>Twenty</MenuItem>
                <MenuItem value={30}>Thirty</MenuItem>
              </Select>
            </FormControl>
          </div>
        </div>
        <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">

          {/* <DateTimePickerComponent onDateTimeChange={handleDateTimeChange} /> */}
          <Grid container spacing={0}>
            {practitioners.map((practitioner, index) => (
              <Grid item xs={12} sm={3} md={6} key={index}>
                <PractitionerCard practitioner={practitioner} />
              </Grid>
            ))}
          </Grid>
        </div>
      </LocalizationProvider>
    </main>
  );
}
