import { createResponse, tokenResponse } from '../../../../utils/common';
import bcrypt from 'bcryptjs';
import { getUserByEmail } from '../../../lib/user';
import { generateToken } from '../../../../utils/jwt';

export async function POST(request: Request) {
    try {

        // const body = await request.formData();
        const body = await request.json();
        // console.log(body);

        // Step 1: Receive and Validate User Input
        if (!body.email || !body.password) {
            return createResponse("Email and password are required", 400);
        }

        try {
            const user = await getUserByEmail(body.email);

            if (!user || !await bcrypt.compare(body.password, user.password)) {
                return createResponse('Invalid email or password', 401);
            }

            const token = generateToken(user.id);
            return tokenResponse(token, 201, user.id);

        } catch (error) {
            console.error(error);
            return createResponse("Could not authenticate user", 500);
        }


    } catch (error) {
        console.error(error);
        return createResponse("Internal server error...", 500);
    }

}