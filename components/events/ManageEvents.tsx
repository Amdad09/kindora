'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import {
    AlertCircle,
    CalendarDays,
    MapPin,
    Pencil,
    Plus,
    RefreshCw,
    Trash2,
} from 'lucide-react';

import { toast } from 'sonner';

import { deleteEvent, getMyEvents } from '@/lib/api/events';
import type { Event } from '@/types/event';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { confirmDelete } from '../shared/ConfirmDeleteToast';

const EVENT_TYPES = [
    'Environment',
    'Charity',
    'Healthcare',
    'Education',
    'Community',
] as const;

const LIMIT = 6;

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

const ManageEvents = () => {
    const router = useRouter();
    const [refreshKey, setRefreshKey] = useState(0);
    const [events, setEvents] = useState<Event[]>([]);

    const [pagination, setPagination] = useState<Pagination>({
        page: 1,
        limit: LIMIT,
        total: 0,
        totalPages: 0,
    });

    const [eventType, setEventType] = useState('all');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const fetchMyEvents = async () => {
            try {
                setLoading(true);
                setError('');

                const result = await getMyEvents({
                    page: pagination.page,
                    limit: LIMIT,
                    eventType: eventType === 'all' ? undefined : eventType,
                });

                if (!active) return;

                setEvents(result.data);
                setPagination(result.pagination);
            } catch (err) {
                if (!active) return;

                const message =
                    err instanceof Error
                        ? err.message
                        : 'Failed to load your events';

                setError(message);
                toast.error(message);
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchMyEvents();

        return () => {
            active = false;
        };
    }, [pagination.page, eventType, refreshKey]);

    const handleFilterChange = (value: string | null) => {
        setEventType(value ?? '');
        setPagination((prev) => ({ ...prev, page: 1 }));
    };

    const handlePageChange = (page: number) => {
        setPagination((prev) => ({
            ...prev,
            page,
        }));
    };

    const handleDelete = (id: string) => {
        confirmDelete({
            title: 'Delete this event?',
            description:
                'This action cannot be undone. The event will be permanently removed.',
            onConfirm: async () => {
                try {
                    await deleteEvent(id);

                    toast.success('Event deleted successfully', {
                        description: 'The event has been removed.',
                    });

                    if (events.length === 1 && pagination.page > 1) {
                        setPagination((prev) => ({
                            ...prev,
                            page: prev.page - 1,
                        }));
                    } else {
                        setRefreshKey((prev) => prev + 1);
                    }
                } catch (err) {
                    const message =
                        err instanceof Error
                            ? err.message
                            : 'Failed to delete event';

                    toast.error('Failed to delete event', {
                        description: message,
                    });
                }
            },
        });
    };

    const getEventStatus = (date: string) => {
        return new Date(date) > new Date() ? 'Upcoming' : 'Completed';
    };

    return (
        <section className="min-h-screen bg-background">
            <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <p className="mb-2 text-sm font-medium text-primary">
                            Event Management
                        </p>

                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Manage Events
                        </h1>

                        <p className="mt-2 text-muted-foreground">
                            Manage and track the events you have created.
                        </p>
                    </div>

                    <Button
                        onClick={() => router.push('/create-event')}
                        className="w-full sm:w-auto"
                    >
                        <Plus className="mr-2 size-4" />
                        Create Event
                    </Button>
                </div>

                {/* Overview */}
                <div className="mb-8 grid gap-4 sm:grid-cols-2">
                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">
                                Total Created Events
                            </p>

                            <p className="mt-2 text-3xl font-bold">
                                {pagination.total}
                            </p>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardContent className="p-5">
                            <p className="text-sm text-muted-foreground">
                                Current Category
                            </p>

                            <p className="mt-2 text-xl font-semibold">
                                {eventType === 'all'
                                    ? 'All Categories'
                                    : eventType}
                            </p>
                        </CardContent>
                    </Card>
                </div>

                {/* Event List Header */}
                <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <h2 className="text-xl font-semibold">Your Events</h2>

                        <p className="mt-1 text-sm text-muted-foreground">
                            View your created events and their details.
                        </p>
                    </div>

                    <Select
                        value={eventType}
                        onValueChange={handleFilterChange}
                    >
                        <SelectTrigger className="w-full sm:w-50">
                            <SelectValue placeholder="Filter category" />
                        </SelectTrigger>

                        <SelectContent>
                            <SelectItem value="all">All Categories</SelectItem>

                            {EVENT_TYPES.map((type) => (
                                <SelectItem key={type} value={type}>
                                    {type}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>

                {/* Loading */}
                {loading && (
                    <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: 6 }).map((_, index) => (
                            <Card key={index} className="overflow-hidden">
                                <div className="aspect-video animate-pulse bg-muted" />

                                <CardContent className="space-y-3 p-5">
                                    <div className="h-5 w-3/4 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-1/2 animate-pulse rounded bg-muted" />
                                    <div className="h-9 animate-pulse rounded bg-muted" />
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!loading && error && (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
                            <AlertCircle className="size-10 text-destructive" />

                            <h3 className="text-lg font-semibold">
                                Unable to load events
                            </h3>

                            <p className="max-w-md text-sm text-muted-foreground">
                                {error}
                            </p>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    setPagination((prev) => ({
                                        ...prev,
                                        page: 1,
                                    }));

                                    setEventType((prev) => prev);
                                }}
                            >
                                <RefreshCw className="mr-2 size-4" />
                                Try again
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Empty State */}
                {!loading && !error && events.length === 0 && (
                    <Card>
                        <CardContent className="flex flex-col items-center py-16 text-center">
                            <div className="mb-4 rounded-full bg-muted p-4">
                                <CalendarDays className="size-8 text-muted-foreground" />
                            </div>

                            <h3 className="text-xl font-semibold">
                                No events found
                            </h3>

                            <p className="mt-2 max-w-sm text-sm text-muted-foreground">
                                You have not created any events in this category
                                yet. Start making a positive impact in your
                                community.
                            </p>

                            <Button
                                className="mt-6"
                                onClick={() => router.push('/create-event')}
                            >
                                <Plus className="mr-2 size-4" />
                                Create Your First Event
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Events Grid */}
                {!loading && !error && events.length > 0 && (
                    <>
                        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                            {events.map((event) => {
                                const status = getEventStatus(event.eventDate);

                                return (
                                    <Card
                                        key={event._id}
                                        className="group overflow-hidden transition-shadow hover:shadow-lg"
                                    >
                                        <div className="relative aspect-video overflow-hidden bg-muted">
                                            <Image
                                                src={event.imageUrl}
                                                alt={event.title}
                                                width={600}
                                                height={400}
                                                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                                            />

                                            <Badge
                                                variant={
                                                    status === 'Upcoming'
                                                        ? 'default'
                                                        : 'secondary'
                                                }
                                                className="absolute right-3 top-3"
                                            >
                                                {status}
                                            </Badge>
                                        </div>

                                        <CardContent className="space-y-4 p-5">
                                            <div className="space-y-2">
                                                <Badge variant="outline">
                                                    {event.eventType}
                                                </Badge>

                                                <h3 className="line-clamp-2 text-lg font-semibold">
                                                    {event.title}
                                                </h3>

                                                <p className="line-clamp-2 text-sm text-muted-foreground">
                                                    {event.description}
                                                </p>
                                            </div>

                                            <div className="space-y-2 text-sm text-muted-foreground">
                                                <div className="flex items-center gap-2">
                                                    <CalendarDays className="size-4 shrink-0" />

                                                    <span>
                                                        {new Date(
                                                            event.eventDate,
                                                        ).toLocaleDateString(
                                                            'en-US',
                                                            {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                            },
                                                        )}
                                                    </span>
                                                </div>

                                                <div className="flex items-center gap-2">
                                                    <MapPin className="size-4 shrink-0" />

                                                    <span className="line-clamp-1">
                                                        {event.location}
                                                    </span>
                                                </div>
                                            </div>
                                            <div className="mt-6 flex gap-3">
                                                <Button
                                                    variant="outline"
                                                    className="flex-1"
                                                    onClick={() =>
                                                        router.push(
                                                            `/manage-events/${event._id}/edit`,
                                                        )
                                                    }
                                                >
                                                    <Pencil size={16} />
                                                    Edit
                                                </Button>

                                                <Button
                                                    variant="destructive"
                                                    className="flex-1"
                                                    onClick={() =>
                                                        handleDelete(event._id)
                                                    }
                                                >
                                                    <Trash2 size={16} />
                                                    Delete
                                                </Button>
                                            </div>
                                            <Button
                                                variant="outline"
                                                className="w-full"
                                                onClick={() =>
                                                    router.push(
                                                        `/upcoming-events/${event._id}`,
                                                    )
                                                }
                                            >
                                                View Event
                                            </Button>
                                        </CardContent>
                                    </Card>
                                );
                            })}
                        </div>

                        {/* Pagination */}
                        {pagination.totalPages > 1 && (
                            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
                                <Button
                                    variant="outline"
                                    disabled={pagination.page <= 1}
                                    onClick={() =>
                                        handlePageChange(pagination.page - 1)
                                    }
                                >
                                    Previous
                                </Button>

                                <span className="text-sm text-muted-foreground">
                                    Page {pagination.page} of{' '}
                                    {pagination.totalPages}
                                </span>

                                <Button
                                    variant="outline"
                                    disabled={
                                        pagination.page >= pagination.totalPages
                                    }
                                    onClick={() =>
                                        handlePageChange(pagination.page + 1)
                                    }
                                >
                                    Next
                                </Button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default ManageEvents;
