import type { Knex } from "knex";
import { createUser } from '../../../lib/user';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../utils/jwt';
import db from '../../../../utils/database';
import { createResponse, tokenResponse } from '../../../../utils/common';

export async function POST(request: Request) {

    try {

        // const body = await request.formData();
        const body = await request.json();
        // console.log(body);

        // Step 1: Receive and Validate User Input
        if (!body.email || !body.password) {
            return createResponse("Email and password are required", 400);
        }

        const userExist = await db('users').where({ email: body.email }).first();
        // console.log('existing', userExist);
        if (userExist) {
            return createResponse("Provided email value is taken", 400);
        }

        // Step 2: Hash the Password
        const hashedPassword = bcrypt.hashSync(body.password, 10);

        // Step 3: Save the User to the Database
        const userId = await createUser(body.name, body.email, hashedPassword, body.is_provider);
        if (userId == 0) {
            return createResponse("Could not create user record", 400);
        }

        // Step 4: Generate a Token or Confirmation Response
        const token = generateToken(userId);
        return tokenResponse(token, 201, String(userId));

    } catch (error) {
        console.error(error);
        return createResponse("Internal server error...", 500);
    }
}
