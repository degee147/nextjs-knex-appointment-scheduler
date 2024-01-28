import db from './database';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function generateTimeSlots() {
    try {
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

            // Check for existing time slots for the same provider, day, and not booked
            const existingTimeSlots = await db("time_slots")
                .where({
                    provider_id: availability.provider_id,
                    is_booked: false,
                    start_time: { '>=': startTime.toISOString() },
                    end_time: { '<=': endTime.toISOString() },
                });

            if (existingTimeSlots.length > 0) {
                continue; // Skip to the next provider if there are existing time slots
            }

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

        // Remove unbooked time slots in the past and not in appointments
        const currentTime = new Date().toISOString();
        await db("time_slots")
            .leftJoin('appointments', 'time_slots.id', 'appointments.time_slot_id')
            .where({
                'time_slots.is_booked': false
            })
            .andWhere('time_slots.start_time', '<', currentTime)
            .whereNull('appointments.time_slot_id')
            .del();

        console.log("Time slots generated for next week");
    } catch (error) {
        console.error("Error generating time slots:", error);
    } finally {
        db.destroy();
    }
}

generateTimeSlots();

export { };
