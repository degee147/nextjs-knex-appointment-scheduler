import type { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../../../utils/jwt';
import { getUserByEmail } from '../../../lib/user';

export default async function login(
    req: NextApiRequest,
    res: NextApiResponse
) {
    try {
        const { email, password } = req.body;
        const user = await getUserByEmail(email);

        if (!user || !await bcrypt.compare(password, user.password)) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const token = generateToken(user.id);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Internal server error' });
    }
}
