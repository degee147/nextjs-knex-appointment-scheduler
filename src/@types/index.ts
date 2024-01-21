export type User = {
    id: string;
    name: string;
    email: string;
    password: string;
    is_provider: boolean;
    // created_at: string;
    // updated_at: string;
}

export type Provider = {
    id: string;
    user_id: number;
    title: string;
    phone: string;
    bio?: string;
    specialization?: string;
    image?: string;
}


// Define an enum for the days of the week
export enum DayOfWeek {
    Monday = "Monday",
    Tuesday = "Tuesday",
    Wednesday = "Wednesday",
    Thursday = "Thursday",
    Friday = "Friday",
    Saturday = "Saturday",
    Sunday = "Sunday"
}

// Define a type for Provider Availability
export type ProviderAvailability = {
    id: string;
    provider_id: number;
    day_of_week: DayOfWeek;
    start_time: string;
    end_time: string;
    slot_duration: number; // Duration in minutes
};

export type TimeSlot = {
    id: string;
    provider_id: number;
    start_time: Date;  // or string,
    end_time: Date;    // same as start_time
    is_booked: boolean;
};

export type Appointment = {
    id: string;
    user_id: number;
    provider_id: number;
    time_slot_id: number;
    appointment_date: Date; // or string
};