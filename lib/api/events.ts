import type { Event } from '@/types/event';

import { authClient } from '@/lib/auth-client';
import type { CreateEventFormValues } from '@/lib/validations/event.schema';

type MyEventsQuery = {
    page?: number;
    limit?: number;
    eventType?: string;
};

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

type UpcomingEventsResponse = {
    success: boolean;
    message: string;
    data: Event[];
    pagination: Pagination;
};

const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const createEvent = async (eventData: CreateEventFormValues) => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to create an event');
    }

    const payload = {
        ...eventData,
        eventDate: new Date(eventData.eventDate).toISOString(),
    };

    const res = await fetch(`${API_URL}/events`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(payload),
    });

    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to create event');
    }

    return result.data;
};

// export const getUpcomingEvents = async ({
//     page = 1,
//     limit = 6,
// }: {
//     page?: number;
//     limit?: number;
// }): Promise<UpcomingEventsResponse> => {
//     if (!API_URL) {
//         throw new Error('NEXT_PUBLIC_API_URL is not configured');
//     }

//     const query = new URLSearchParams({
//         page: String(page),
//         limit: String(limit),
//     });

//     const res = await fetch(`${API_URL}/events?${query}`, {
//         cache: 'no-store',
//     });

//     if (!res.ok) {
//         throw new Error('Failed to fetch upcoming events');
//     }

//     return res.json();
// };

type GetUpcomingEventsParams = {
    page?: number;
    limit?: number;
    search?: string;
    eventType?: string;
};

export const getUpcomingEvents = async ({
    page = 1,
    limit = 10,
    search,
    eventType,
}: GetUpcomingEventsParams): Promise<UpcomingEventsResponse> => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const query = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (search?.trim()) {
        query.set('search', search.trim());
    }

    if (eventType) {
        query.set('eventType', eventType);
    }

    const res = await fetch(`${API_URL}/events?${query}`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch upcoming events');
    }

    return res.json();
};

export const getMyEvents = async ({
    page = 1,
    limit = 10,
    eventType,
}: MyEventsQuery = {}) => {
    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to view your events');
    }

    if (!API_URL) {
        throw new Error('API URL is not configured');
    }

    const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
    });

    if (eventType) {
        params.set('eventType', eventType);
    }

    const res = await fetch(`${API_URL}/events/mine?${params.toString()}`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to retrieve your events');
    }

    return result;
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

export const updateEvent = async (
    id: string,
    eventData: CreateEventFormValues,
) => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to update this event');
    }

    const payload = {
        ...eventData,
        eventDate: new Date(eventData.eventDate).toISOString(),
    };

    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${data.token}`,
        },
        body: JSON.stringify(payload),
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to update event');
    }

    return result.data;
};

export const deleteEvent = async (id: string) => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to delete this event');
    }

    const res = await fetch(`${API_URL}/events/${id}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to delete event');
    }

    return result;
};

export const getJoinedEvents = async () => {
    if (!API_URL) {
        throw new Error('NEXT_PUBLIC_API_URL is not configured');
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to view your joined events');
    }

    const res = await fetch(`${API_URL}/events/joined`, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
        cache: 'no-store',
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to fetch joined events');
    }

    return result.data;
};

export const joinEvent = async (eventId: string) => {
    if (!API_URL) {
        throw new Error('API URL is not configured');
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to join this event');
    }

    const res = await fetch(`${API_URL}/events/${eventId}/join`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to join event');
    }

    return result;
};

export const leaveEvent = async (eventId: string) => {
    if (!API_URL) {
        throw new Error('API URL is not configured');
    }

    const { data, error } = await authClient.token();

    if (error || !data?.token) {
        throw new Error('Please login to leave this event');
    }

    const res = await fetch(`${API_URL}/events/${eventId}/join`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${data.token}`,
        },
    });

    const result = await res.json();

    if (!res.ok) {
        throw new Error(result.message || 'Failed to leave event');
    }

    return result;
};
