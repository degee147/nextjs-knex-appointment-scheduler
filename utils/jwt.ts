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
        return jwt.verify(token as string, JWT_SECRET);
    } catch (error) {
        // console.log('verification error', error);
        throw new Error('Invalid or expired token');
    }
};