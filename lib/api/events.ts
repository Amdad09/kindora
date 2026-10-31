import type { Event } from '@/types/event';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const getUpcomingEvents = async (limit?: number): Promise<Event[]> => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }
    const query = limit ? `?limit=${limit}` : '';
    const res = await fetch(`${API_URL}/events${query}`, { cache: 'no-store' });
    if (!res.ok) throw new Error('Failed to fetch upcoming events');
    const result = await res.json();
    return result.data;
};

export const getEventById = async (id: string): Promise<Event> => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const res = await fetch(`${API_URL}/events/${id}`, {
        cache: 'no-store',
    });
    if (!res.ok) {
        throw new Error(
            res.status === 404 ? 'Event not found' : 'Failed to fetch event',
        );
    }
    const result = await res.json();
    return result.data;
};