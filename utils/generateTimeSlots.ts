import db from './database';

const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

async function generateTimeSlots() {
    try {
        // Fetch provider availability data
        const providerAvailabilities = await db("provider_availability").select("*");

        const timeSlots = [];

        for (const availability of providerAvailabilities) {
            // Determine the day of the week for the availability
            const dayIndex = daysOfWeek.indexOf(availability.day_of_week);
            let baseDate = new Date();
            // Adjust the date to the next week
            baseDate.setDate(baseDate.getDate() + ((7 - baseDate.getDay() + dayIndex) % 7 || 7));

            // Parse the start and end times from availability
            const [startHours, startMinutes] = availability.start_time.split(':').map(Number);
            const [endHours, endMinutes] = availability.end_time.split(':').map(Number);

            const startTime = new Date(baseDate);
            startTime.setHours(startHours, startMinutes);

            const endTime = new Date(baseDate);
            endTime.setHours(endHours, endMinutes);

            // Initialize slot count and last slot time
            let slotCount = 0;
            let lastSlotTime = null;

            // Generate time slots within the availability period
            for (let slotStart = new Date(startTime); slotStart < endTime; slotStart.setMinutes(slotStart.getMinutes() + availability.slot_duration)) {
                if (slotCount >= 7) {
                    // Stop if 3 slots have been created for the day
                    break;
                }

                // Check for 3-hour interval between slots
                if (lastSlotTime && (slotStart.getTime() - lastSlotTime.getTime()) < 3 * 60 * 60 * 1000) {
                    continue; // Skip to the next iteration if interval is less than 3 hours
                }

                const slotEnd = new Date(slotStart.getTime());
                slotEnd.setMinutes(slotEnd.getMinutes() + availability.slot_duration);

                // Ensure the slot end time does not exceed the availability end time
                if (slotEnd > endTime) {
                    break;
                }

                // Add the slot to the array and update lastSlotTime and slotCount
                timeSlots.push({
                    provider_id: availability.provider_id,
                    start_time: slotStart.toISOString(),
                    end_time: slotEnd.toISOString(),
                    is_booked: false
                });

                lastSlotTime = slotStart;
                slotCount++;
            }
        }

        // Inserts generated time slots
        await db("time_slots").insert(timeSlots);
        console.log("slots generated for next week");
    } catch (error) {
        console.error("Error generating time slots:", error);
    } finally {
        // Close the database connection
        db.destroy();
    }
}

// export default generateTimeSlots;
generateTimeSlots();

export { };