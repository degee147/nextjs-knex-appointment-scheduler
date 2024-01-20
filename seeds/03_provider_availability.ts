import { Knex } from "knex";
import { faker } from '@faker-js/faker';
import { getRandomElement } from '../utils/common';


export async function seed(knex: Knex): Promise<void> {
    // Deletes ALL existing entries in provider_availability
    await knex("provider_availability").del();

    // Fetch provider IDs from the providers table
    const providerIds = await knex("providers").select("id");

    const providerAvailabilities = [];
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    for (const provider of providerIds) {
        for (const day of daysOfWeek) {
            const startTime = new Date();
            startTime.setDate(startTime.getDate() + 1 + daysOfWeek.indexOf(day));
            startTime.setHours(8, 0, 0, 0);

            // End time is 4 hours later
            const endTime = new Date(startTime.getTime() + 4 * 60 * 60 * 1000);

            providerAvailabilities.push({
                provider_id: provider.id,
                day_of_week: day,
                start_time: startTime.toISOString().split('T')[1], // Format as HH:mm:ss
                end_time: endTime.toISOString().split('T')[1], // Format as HH:mm:ss
                slot_duration: getRandomElement([15, 30, 45, 60]) // Random duration between 15 and 60 minutes
            });
        }
    }

    // Inserts seed entries for provider_availability
    await knex("provider_availability").insert(providerAvailabilities);
};
