import { NextRequest } from 'next/server';
import { createResponse } from '../../../../../utils/common';
import db from '../../../../../utils/database';

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {

    try {

        const searchParams = request.nextUrl.searchParams;
        const dateParam = searchParams.get('date');
        const specializationParam = searchParams.get('specialization');

        // console.log('dataparam', dateParam);
        // console.log('specializationParam', specializationParam);


        // Convert dateParam to a usable format (if it exists)
        let dateFilter = dateParam ? new Date(dateParam) : new Date();
        dateFilter.setHours(0, 0, 0, 0); // Set the time to the start of the day for filtering

        // Get all providers or only those with a specific specialization
        let query = db('providers').select('*');
        if (specializationParam) {
            query = query.where('specialization', specializationParam);
        }

        const providers = await query;

        // Then, for each provider, get their slots
        for (const provider of providers) {
            provider.user = await db('users').where('id', provider.user_id).first();
            const currentDateTime = new Date().toISOString();

            // Adjust the slot query based on the date parameter
            let slotQuery = db('time_slots').where({
                provider_id: provider.id,
                is_booked: false
            }).andWhere('start_time', '>', currentDateTime);

            if (dateParam) {
                let nextDay = new Date(dateFilter);
                nextDay.setDate(nextDay.getDate() + 1);

                slotQuery = slotQuery.andWhere('start_time', '>=', dateFilter.toISOString())
                    .andWhere('start_time', '<', nextDay.toISOString());
            }

            provider.slots = await slotQuery.select('*');
        }

        return createResponse("All providers data with their slots", 200, providers);
    } catch (error) {
        console.error(error);
        // throw error;
        return createResponse("Data not found", 200, []);
    }


}