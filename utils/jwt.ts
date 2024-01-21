import { NextApiRequest, NextApiResponse, NextApiHandler } from 'next';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'default_secret';

export const generateToken = (userId: number | string): string => {
    return jwt.sign({ userId }, JWT_SECRET, {
        expiresIn: '1h', // token will expire in 1 hour
    });
};

export const verifyToken = (token: string): string | jwt.JwtPayload => {
    try {
        return jwt.verify(token, JWT_SECRET);
    } catch (error) {
        throw new Error('Invalid or expired token');
    }
};

export const authenticated = (fn: NextApiHandler) => async (
    req: NextApiRequest,
    res: NextApiResponse
) => {
    try {
        const token = req.headers.authorization?.split(' ')[1];
        verifyToken(token as string);
        return await fn(req, res);
    } catch (error) {
        res.status(401).json({ message: 'Unauthorized' });
    }
};
