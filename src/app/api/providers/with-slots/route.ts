import { createResponse } from '../../../../../utils/common';
import db from '../../../../../utils/database';

export async function GET(request: Request) {

    try {
        // First, get all users
        const providers = await db('providers').select('*');

        // Then, for each user, get their slots
        for (const provider of providers) {
            provider.slots = await db('provider_availability').where('provider_id', provider.id).select('*');
        }

        return createResponse("All providers data with their slots", 200, providers);
    } catch (error) {
        console.error(error);
        // throw error;
        return createResponse("Data not found", 200, []);
    }


}