/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
    CalendarDays,
    MapPin,
    RefreshCw,
    Heart,
    AlertCircle,
} from 'lucide-react';
import { toast } from 'sonner';
import Image from 'next/image';

import { getJoinedEvents, leaveEvent } from '@/lib/api/events';

import type { Event } from '@/types/event';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

const formatEventDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
        hour: 'numeric',
        minute: '2-digit',
    });
};

const JoinedEventsPage = () => {
    const router = useRouter();

    const [events, setEvents] = useState<Event[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [joiningId, setJoiningId] = useState<string | null>(null);

    const loadJoinedEvents = async () => {
        try {
            setLoading(true);
            setError('');

            const data = await getJoinedEvents();

            setEvents(data);
        } catch (err) {
            const message =
                err instanceof Error
                    ? err.message
                    : 'Failed to load joined events';

            setError(message);
            toast.error(message);
        } finally {
            setLoading(false);
        }
    };

    const handleLeave = async (eventId: string) => {
        try {
            setJoiningId(eventId);

            await leaveEvent(eventId);

            setEvents((prev) => prev.filter((event) => event._id !== eventId));

            toast.success('You left this event successfully!');
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        } finally {
            setJoiningId(null);
        }
    };

    useEffect(() => {
        loadJoinedEvents();
    }, []);

    return (
        <section className="mx-auto w-full pt-30 max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div className="space-y-2">
                    <p className="text-sm font-medium text-primary">
                        KINDORA / YOUR ACTIVITIES
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Joined Events
                    </h1>

                    <p className="max-w-2xl text-muted-foreground">
                        Keep track of the events you have joined and the
                        positive impact you are making in your community.
                    </p>
                </div>

                {!loading && !error && (
                    <Badge
                        variant="secondary"
                        className="w-fit rounded-full px-3 py-1"
                    >
                        {events.length}{' '}
                        {events.length === 1 ? 'Event' : 'Events'}
                    </Badge>
                )}
            </div>

            {/* Loading */}
            {loading && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <Card key={item} className="overflow-hidden">
                            <div className="aspect-video animate-pulse bg-muted" />

                            <CardContent className="space-y-4 p-5">
                                <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                                <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                                <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}

            {/* Error */}
            {!loading && error && (
                <Card className="border-destructive/30">
                    <CardContent className="flex flex-col items-center gap-4 p-8 text-center">
                        <AlertCircle className="size-10 text-destructive" />

                        <div className="space-y-1">
                            <h2 className="text-lg font-semibold">
                                Could not load joined events
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {error}
                            </p>
                        </div>

                        <Button variant="outline" onClick={loadJoinedEvents}>
                            <RefreshCw className="mr-2 size-4" />
                            Try Again
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Empty State */}
            {!loading && !error && events.length === 0 && (
                <Card className="border-dashed">
                    <CardContent className="flex flex-col items-center gap-5 px-6 py-16 text-center">
                        <div className="flex size-16 items-center justify-center rounded-full bg-primary/10">
                            <Heart className="size-8 text-primary" />
                        </div>

                        <div className="max-w-md space-y-2">
                            <h2 className="text-xl font-semibold">
                                You have not joined any events yet
                            </h2>

                            <p className="text-muted-foreground">
                                Discover meaningful events around you and become
                                part of something positive.
                            </p>
                        </div>

                        <Button onClick={() => router.push('/upcoming-events')}>
                            Explore Events
                        </Button>
                    </CardContent>
                </Card>
            )}

            {/* Events Grid */}
            {!loading && !error && events.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Card
                            key={event._id}
                            className="group overflow-hidden border-border/70 transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            {/* Event Image */}
                            <div className="relative aspect-video overflow-hidden bg-muted">
                                <Image
                                    src={event.imageUrl}
                                    alt={event.title}
                                    width={600}
                                    height={600}
                                    className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
                                />

                                <Badge className="absolute left-3 top-3">
                                    {event.eventType}
                                </Badge>
                            </div>

                            <CardContent className="space-y-4 p-5">
                                <div className="space-y-2">
                                    <h2 className="line-clamp-2 text-lg font-semibold">
                                        {event.title}
                                    </h2>

                                    <p className="line-clamp-2 text-sm text-muted-foreground">
                                        {event.description}
                                    </p>
                                </div>

                                <div className="space-y-2 text-sm text-muted-foreground">
                                    <div className="flex items-center gap-2">
                                        <CalendarDays className="size-4 shrink-0 text-primary" />

                                        <span>
                                            {formatEventDate(event.eventDate)}
                                        </span>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <MapPin className="size-4 shrink-0 text-primary" />

                                        <span className="line-clamp-1">
                                            {event.location}
                                        </span>
                                    </div>
                                </div>

                                <Button
                                    variant="destructive"
                                    className="w-full"
                                    disabled={joiningId === event._id}
                                    onClick={() => handleLeave(event._id)}
                                >
                                    {joiningId === event._id
                                        ? 'Leaving...'
                                        : 'Leave Event'}
                                </Button>

                                <Button
                                    variant="outline"
                                    className="w-full"
                                    onClick={() =>
                                        router.push(`/upcoming-events/${event._id}`)
                                    }
                                >
                                    View Event
                                </Button>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            )}
        </section>
    );
};

export default JoinedEventsPage;
