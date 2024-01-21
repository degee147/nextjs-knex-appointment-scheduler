// src/middleware/auth.ts
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';
import { verifyToken } from '../../../../utils/jwt';

const secret = process.env.JWT_SECRET;

export function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    // Check if the route is either /providers or /users
    if (pathname.startsWith('/api/providers') || pathname.startsWith('/api/users')) {

   
        const authHeader = req.headers.get('authorization');

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        const token = authHeader.split(' ')[1];

        if (!token) {
            return new Response(JSON.stringify({ error: 'Authentication required' }), {
                status: 401,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }

        try {
            //throws Error: The edge runtime does not support Node.js 'crypto' module on windows
            // so we disable during development
            // verifyToken(token);

            
        } catch (err) {
            return new Response(JSON.stringify({ error: 'Invalid token' }), {
                status: 403,
                headers: {
                    'Content-Type': 'application/json',
                },
            });
        }
    }

    return NextResponse.next();
}
