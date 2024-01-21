import { createResponse } from '../../../../../utils/common';
import db from '../../../../../utils/database';

export async function GET(request: Request, { params }: { params: { id: string } }) {

    const profile = await db('users').where({ id: params.id }).first();
    return createResponse("Provider profile data for " + params.id, 200, profile);
}