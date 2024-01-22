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

export function tokenResponse(token: string, status: number, user_id: number) {
    return new Response(JSON.stringify({ token, user_id }), {
        headers: {
            "Content-Type": "application/json",
        },
        status: status
    });
}


// Function to generate a random start hour within the range
export function getRandomStartHour() {

    // Define the range for random start times (8 AM to 4 PM)
    const minHour = 8; // 8 AM
    const maxHour = 16; // 4 PM

    return Math.floor(Math.random() * (maxHour - minHour + 1)) + minHour;
};