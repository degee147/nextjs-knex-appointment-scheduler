import { createResponse } from '../../../../utils/common';
import db from '../../../../utils/database';

export async function GET(request: Request) {
    const users = await db('users').select('*');
    return createResponse("All user data", 200, users);
}