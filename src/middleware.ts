import { NextRequest } from "next/server";
import { middleware as authMiddleware } from "./app/api/middleware/auth";

export function middleware(request: NextRequest) {
    return authMiddleware(request);
}

