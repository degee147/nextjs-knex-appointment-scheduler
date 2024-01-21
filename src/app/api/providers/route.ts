import { createResponse } from '../../../../utils/common';
import db from '../../../../utils/database';

export async function GET(request: Request) {
    // const providers = await db('providers').select('*');
    const providers = await db('providers').select('*').orderBy('created_at', 'desc');
    return createResponse("All providers data", 200, providers);
}

export async function POST(request: Request) {
    // Extract provider data from the request body
    const data = await request.json();

    // Add validation and error handling as necessary
    if (!data.user_id || !data.title || !data.phone || !data.specialization) {
        return createResponse("user_id, title, phone and specialization are required", 400);
    }

    const profile = await db('users').where({ id: data.user_id }).first();
    if (!profile) {
        return createResponse("user_id must belong to an existing user record", 400);
    }

    if (!profile.is_provider) {
        return createResponse("Selected user is not a provider", 400);
    }

    try {
        const newProvider = await db('providers').insert(data);
        data.provider_id = newProvider[0];
        return createResponse("Provider created successfully", 201, data);
    } catch (error) {
        console.error(error);
        return createResponse("Error creating provider", 500);
    }
}

export async function PATCH(request: Request) {

    const data = await request.json();

    // Update provider data in the database
    try {
        const updatedProvider = await db('providers').where('id', data.id).update(data);
        data.provider_id = updatedProvider;
        return createResponse("Provider updated successfully", 200, data);
    } catch (error) {
        console.error(error);
        return createResponse("Error updating provider", 500);
    }
}

export async function DELETE(request: Request) {

    const data = await request.json();
    try {
        await db('providers').where('id', data.id).del();
        return createResponse("Provider deleted successfully", 200);
    } catch (error) {
        console.error(error);
        return createResponse("Error deleting provider", 500);
    }
}
