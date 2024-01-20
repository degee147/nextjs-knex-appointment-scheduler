import { Knex } from "knex";
import { faker } from '@faker-js/faker';

export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries in time_slots
    await knex("time_slots").del();

    // Fetch provider availability data
    const providerAvailabilities = await knex("provider_availability").select("*");

    const timeSlots = [];

    for (const availability of providerAvailabilities) {
        // Create a base date (e.g., tomorrow)
        let baseDate = new Date();
        baseDate.setDate(baseDate.getDate() + 1);
        baseDate.setHours(0, 0, 0, 0); // reset time to midnight

        // Parse start and end times from availability
        const [startHours, startMinutes] = availability.start_time.split(':').map(Number);
        const [endHours, endMinutes] = availability.end_time.split(':').map(Number);

        const startTime = new Date(baseDate);
        startTime.setHours(startHours, startMinutes);

        const endTime = new Date(baseDate);
        endTime.setHours(endHours, endMinutes);

        const slotDuration = availability.slot_duration; // Duration in minutes

        // Generate time slots within the availability period
        for (let slotStart = new Date(startTime); slotStart < endTime; slotStart.setMinutes(slotStart.getMinutes() + slotDuration)) {
            const slotEnd = new Date(slotStart.getTime());
            slotEnd.setMinutes(slotEnd.getMinutes() + slotDuration);

            // Ensure the slot end time does not exceed the availability end time
            if (slotEnd > endTime) break;

            timeSlots.push({
                provider_id: availability.provider_id,
                start_time: slotStart.toISOString(),
                end_time: slotEnd.toISOString(),
                is_booked: false // initially, all slots are not booked
            });
        }
    }

    // Inserts seed entries for time_slots
    await knex("time_slots").insert(timeSlots);
};
