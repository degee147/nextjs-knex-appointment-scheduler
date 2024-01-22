import { createResponse, tokenResponse } from '../../../../utils/common';
import bcrypt from 'bcryptjs';
import db from '../../../../utils/database';
import { Appointment } from '../../../../src/@types';
import { convertToContextualFormat } from '../../../../utils/common';

export async function POST(request: Request) {
    try {
        const body = await request.json();

        if (!body.user_id || !body.time_slot_id) {
            console.log("body", body);
            return createResponse("Oops! Something went wrong", 400);
        }

        // Start a transaction
        try {
            const result = await db.transaction(async trx => {
                // Check slot availability and fetch provider details in one go
                const slotDetails = await trx('time_slots')
                    .join('providers', 'time_slots.provider_id', 'providers.id')
                    .join('users', 'providers.user_id', 'users.id')
                    .select('time_slots.*', 'users.name as provider_name')
                    .where('time_slots.id', body.time_slot_id)
                    .andWhere('time_slots.is_booked', false)
                    .first();

                if (!slotDetails) {
                    return createResponse("This slot is no longer available", 400);
                }

                // Create the appointment
                const appointment = {
                    user_id: body.user_id,
                    provider_id: slotDetails.provider_id,
                    time_slot_id: slotDetails.id,
                    appointment_date: slotDetails.start_time
                };

                const [insertedId] = await trx('appointments').insert(appointment);

                if (!insertedId) {
                    return createResponse("Failed to create appointment", 500);
                }

                // Update the time slot as booked
                const updateCount = await trx('time_slots')
                    .where({ id: body.time_slot_id })
                    .update({ is_booked: true });

                if (!updateCount) {
                    return createResponse("Failed to update time slot", 500);
                }

                return createResponse("Appointment Booked for " + convertToContextualFormat(slotDetails.start_time) + " with " + slotDetails.provider_name, 200, { success: true, slot: slotDetails });
            });

            return result;
        } catch (error) {
            console.error("Transaction error:", error);
            return createResponse("Error booking appointment", 500);
        }


    } catch (error) {
        console.error(error);
        return createResponse("Internal server error...", 500);
    }

}