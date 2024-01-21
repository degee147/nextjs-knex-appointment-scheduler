export function getRandomElement<T>(items: T[]): T {
    let randomIndex = Math.floor(Math.random() * items.length);
    return items[randomIndex];
}

export function createResponse(message: string, status: number, data?: any) {
    return new Response(JSON.stringify({ message, data }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: status
    });
}

export function tokenResponse(token: string, status: number) {
    return new Response(JSON.stringify({ token }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: status
    });
}