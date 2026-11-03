'use client';

import { useEffect, useState } from 'react';
import { CalendarDays, RefreshCw } from 'lucide-react';

import { getUpcomingEvents } from '@/lib/api/events';
import type { Event } from '@/types/event';
import EventGrid from '@/components/events/EventGrid';

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

const LIMIT = 9;

const UpcomingEvents = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [retry, setRetry] = useState(0);

    useEffect(() => {
        let ignore = false;

        const loadEvents = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const result = await getUpcomingEvents({
                    page,
                    limit: LIMIT,
                });

                if (ignore) return;

                setEvents(result.data);
                setPagination(result.pagination);
            } catch (error) {
                if (ignore) return;

                console.error('Upcoming events error:', error);
                setHasError(true);
            } finally {
                if (!ignore) {
                    setIsLoading(false);
                }
            }
        };

        loadEvents();

        return () => {
            ignore = true;
        };
    }, [page, retry]);


    return (
        <section className="min-h-screen bg-background pt-20">
            <div className="mx-auto max-w-350 py-10 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mb-10 flex flex-col gap-5 sm:mb-12 sm:flex-row sm:items-end sm:justify-between">
                    <div className="max-w-2xl">
                        <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-4 py-2 text-sm font-medium text-primary">
                            <CalendarDays size={16} />
                            Community Events
                        </div>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                            Find Your Next{' '}
                            <span className="text-primary">Opportunity</span>
                        </h2>

                        <p className="mt-4 text-base leading-7 text-muted-foreground sm:text-lg">
                            Explore upcoming community events, meet like-minded
                            people, and take action to create meaningful change
                            in your community.
                        </p>
                    </div>

                    {!isLoading && !hasError && pagination && (
                        <div className="shrink-0 rounded-xl border border-border bg-card px-5 py-3">
                            <p className="text-sm text-muted-foreground">
                                Total available events
                            </p>
                            <p className="mt-1 text-2xl font-bold tabular-nums">
                                {pagination.total}
                            </p>
                        </div>
                    )}
                </div>

                {/* Loading */}
                {isLoading && (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {Array.from({ length: LIMIT }).map((_, index) => (
                            <div
                                key={index}
                                className="overflow-hidden rounded-2xl border border-border bg-card"
                            >
                                <div className="aspect-video animate-pulse bg-muted" />

                                <div className="space-y-4 p-5">
                                    <div className="h-4 w-1/3 animate-pulse rounded bg-muted" />
                                    <div className="h-6 w-3/4 animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-full animate-pulse rounded bg-muted" />
                                    <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
                                    <div className="h-10 w-full animate-pulse rounded-lg bg-muted" />
                                </div>
                            </div>
                        ))}
                    </div>
                )}

                {/* Error */}
                {!isLoading && hasError && (
                    <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                        <h3 className="text-xl font-semibold">
                            Unable to Load Events
                        </h3>

                        <p className="mx-auto mt-2 max-w-md text-muted-foreground">
                            We could not load the events right now. Please try
                            again in a moment.
                        </p>

                        <button
                            onClick={() => setRetry((prev) => prev + 1)}
                            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            <RefreshCw size={16} />
                            Try Again
                        </button>
                    </div>
                )}

                {/* Events */}
                {!isLoading && !hasError && (
                    <>
                        <EventGrid
                            events={events}
                            pagination={pagination}
                            onPageChange={setPage}
                        />

                        {pagination && pagination.total > 0 && (
                            <p className="mt-6 text-center text-sm text-muted-foreground">
                                Showing {events.length} of {pagination.total}{' '}
                                events
                            </p>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default UpcomingEvents;
