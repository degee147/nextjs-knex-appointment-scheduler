import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../utils/jwt';
import { createUser } from '../../../lib/user';

export default async function signup(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { name, email, password, is_provider } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const userId = await createUser(name, email, hashedPassword, is_provider);
        const token = generateToken(userId);

        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
