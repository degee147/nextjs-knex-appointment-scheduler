"use client";

import Image from "next/image";
import React, { useState } from 'react';
import { Booking } from "./components/Booking";

import { Card, CardContent, Typography, CardMedia, Box } from '@mui/material';

export default function Home() {


  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
        {/* <Typography variant="h3" component="div">
        Select your doctor and appointment time
      </Typography> */}
        <Booking></Booking>
      
    </main>
  );
}
