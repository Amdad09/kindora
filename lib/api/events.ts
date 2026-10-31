import type { Event } from "@/types/event";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUpcomingEvents = async (): Promise<Event[]> => {
    const res = await fetch(`${API_URL}/events`, { cache: 'no-store' })
    if (!res.ok) throw new Error('Failed to fetch upcoming events');
    const result = await res.json();
    return result.data;
};