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
import CircularProgress from '@mui/material/CircularProgress';

import moment from 'moment';


export const Booking = () => {

    const [selectedSpecialization, setSelectedSpecialization] = useState('');
    const [selectedDate, setSelectedDate] = useState(moment());
    const [isLoading, setIsLoading] = useState(true);
    const [practitioners, setPractitioners] = useState([]);
    let apiUrl = `${process.env.NEXT_PUBLIC_API_BASE_URL}api/providers/with-slots`;



    const fetchProviders = async (date: string = "", specialization: string = "") => {

        // console.log("date", date);
        // console.log("specialization", specialization);

        setIsLoading(true);
        try {

            interface Params {
                date?: string;
                specialization?: string;
            }
            let params: Params = {};
            if (date) {
                params.date = date;
            }
            if (specialization) {
                params.specialization = specialization;
            }

            const response = await axios.get(apiUrl, { params });
            // console.log(response.data.data);
            setPractitioners(response.data.data);
            setIsLoading(false);
        } catch (error) {
            console.error('Error fetching providers:', error);
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProviders("", "");
    }, []);


    const handleChange = (specialization: any) => {
        // Handle the date-time change, maybe fetch available practitioners
        setSelectedSpecialization(specialization.target.value);
        // console.log("specialization", specialization.target.value);

        const formattedDate = selectedDate.format('YYYY-MM-DD');
        fetchProviders(formattedDate, specialization.target.value);
    };


    const handleDateChange = (date: any) => {
        setSelectedDate(date);
        const formattedDate = date.format('YYYY-MM-DD');
        fetchProviders(formattedDate, selectedSpecialization);
    };

    return (
        <LocalizationProvider dateAdapter={AdapterMoment}>

            <div className="flex flex-col items-center justify-center">
                <h1>Select your doctor and appointment time</h1>
                <div className="grid grid-cols-2">
                    {/* Content for row 1 */}
                    <div className="p-1">
                        <h3>Date</h3>
                        {/* <DatePicker /> */}
                        <DatePicker
                            // label="Select Date"
                            format='YYYY-MM-DD'
                            value={selectedDate}
                            onChange={handleDateChange}
                        />
                    </div>
                    <div className="p-1">
                        <h3>Specialization</h3>
                        <FormControl fullWidth>
                            <Select
                                labelId="demo-simple-select-label"
                                id="specialization-select"
                                value={selectedSpecialization}
                                label="Specialization"
                                onChange={handleChange}
                            >
                                <MenuItem value="Cardiology">Cardiology</MenuItem>
                                <MenuItem value="Dermatology">Dermatology</MenuItem>
                                <MenuItem value="Neurology">Neurology</MenuItem>
                                <MenuItem value="Pediatrics">Pediatrics</MenuItem>
                                <MenuItem value="Surgeon">Surgeon</MenuItem>
                                <MenuItem value="Physiotherapist">Physiotherapist</MenuItem>
                            </Select>
                        </FormControl>
                    </div>


                </div>
                <div className="p-1  items-center justify-center">
                    {isLoading && (
                        <div>
                            <br />
                            <CircularProgress size={50} color="secondary" />
                        </div>
                    )}
                </div>
            </div>

            <div className="z-10 w-full items-center justify-between font-mono text-sm lg:flex">

                {!isLoading && (
                    <Grid container spacing={0}>
                        {practitioners.map((practitioner, index) => (
                            <Grid item xs={12} sm={12} md={12} key={index}>
                                <PractitionerCard practitioner={practitioner} />
                            </Grid>
                        ))}
                    </Grid>
                )}

                {/* <DateTimePickerComponent onDateTimeChange={handleDateTimeChange} /> */}

            </div >
        </LocalizationProvider >
    );
}