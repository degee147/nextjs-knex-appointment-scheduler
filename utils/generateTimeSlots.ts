import db from './database';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function generateTimeSlots() {
    try {

        let count = 0;
        // remove unbooked slots
        const timeSlots = await db("time_slots")
            .where({
                'time_slots.is_booked': false
            })

        for (const timeSlot of timeSlots) {
            // Check if the time slot still meets the conditions
            const appointmentExists = await db("appointments")
                .where("time_slot_id", timeSlot.id)
                .first();

            if (!appointmentExists) {
                // Delete the time slot since it's not booked
                count++;
                await db("time_slots")
                    .where("id", timeSlot.id)
                    .del();
            }
        }

        const providerAvailabilities = await db("provider_availability").select("*");

        for (const availability of providerAvailabilities) {
            // Current date and time
            const now = new Date();

            // Check the number of unbooked slots for the provider
            const unbookedSlots = await db("time_slots")
                .where({
                    provider_id: availability.provider_id,
                    is_booked: false
                })
                .andWhere('start_time', '>=', now.toISOString());

            if (unbookedSlots.length >= 7) {
                continue; // Skip to the next provider if 7 or more slots are unbooked
            }

            const timeSlots = [];
            const dayIndex = daysOfWeek.indexOf(availability.day_of_week);
            let baseDate = new Date();
            baseDate.setDate(baseDate.getDate() + ((7 - baseDate.getDay() + dayIndex) % 7 || 7));

            // Skip past dates
            if (baseDate < now) {
                continue;
            }

            const [startHours, startMinutes] = availability.start_time.split(':').map(Number);
            const [endHours, endMinutes] = availability.end_time.split(':').map(Number);

            const startTime = new Date(baseDate);
            startTime.setHours(startHours, startMinutes);

            const endTime = new Date(baseDate);
            endTime.setHours(endHours, endMinutes);



            let slotCount = unbookedSlots.length;
            let lastSlotTime = null;

            for (let slotStart = new Date(startTime); slotStart < endTime && slotCount < 7; slotStart.setMinutes(slotStart.getMinutes() + availability.slot_duration)) {
                if (lastSlotTime && (slotStart.getTime() - lastSlotTime.getTime()) < 3 * 60 * 60 * 1000) {
                    continue;
                }

                const slotEnd = new Date(slotStart.getTime());
                slotEnd.setMinutes(slotEnd.getMinutes() + availability.slot_duration);

                if (slotEnd > endTime) {
                    break;
                }

                // Check for existing time slots for the same provider, day, and not booked
                const existingTimeSlots = await db("time_slots")
                    .where({
                        provider_id: availability.provider_id,
                        // is_booked: false,
                        start_time: slotStart.toISOString(),
                        end_time: slotEnd.toISOString(),
                    });

                if (existingTimeSlots.length > 0) {
                    continue; // Skip to the next provider if there are existing time slots
                }

                timeSlots.push({
                    provider_id: availability.provider_id,
                    start_time: slotStart.toISOString(),
                    end_time: slotEnd.toISOString(),
                    is_booked: false
                });

                lastSlotTime = slotStart;
                slotCount++;
            }

            // Inserts new time slots if any
            if (timeSlots.length > 0) {
                await db("time_slots").insert(timeSlots);
            }
        }

        
        console.log("Time slots generated for next week, removed duplicates. Count: " + count);
    } catch (error) {
        console.error("Error generating time slots:", error);
    } finally {
        db.destroy();
    }
}

generateTimeSlots();

export { };
