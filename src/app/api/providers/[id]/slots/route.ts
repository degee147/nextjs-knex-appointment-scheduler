import { createResponse } from '../../../../../../utils/common';

export async function GET(request: Request, { params }: { params: { id: string } }) {
    
    return createResponse("Provider slots data for " + params.id, 200);
}