import { createResponse } from '../../../../utils/common';
import db from '../../../../utils/database';

export async function GET(request: Request) {
    const providers = await db('providers').select('*');
    return createResponse("All providers data", 200, providers);
}