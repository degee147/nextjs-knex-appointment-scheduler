import React, { useState, useEffect } from 'react';
import { Grid } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { faker } from '@faker-js/faker';
import PractitionerCard from './PractitionerCard';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import axios from 'axios';


export const Booking = () => {

    const [practitioners, setPractitioners] = useState([]);
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL + '/api/providers/with-slots';


    useEffect(() => {
        const fetchProviders = async () => {
            try {
                const response = await axios.get(apiUrl);
                // console.log(response.data.data);
                setPractitioners(response.data.data);
            } catch (error) {
                console.error('Error fetching providers:', error);
            }
        };

        fetchProviders();
    }, []);


    const handleDateTimeChange = (dateTime) => {
        // Handle the date-time change, maybe fetch available practitioners
    };
    const handleChange = (dateTime) => {
        // Handle the date-time change, maybe fetch available practitioners
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

            <div className="flex flex-col items-center justify-center">
                <h1>Select your doctor and appointment time</h1>
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
    );
}