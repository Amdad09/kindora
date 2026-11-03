'use client';

import { useEffect, useState } from 'react';
import {
    CalendarDays,
    RefreshCw,
    Search,
    X,
    SlidersHorizontal,
} from 'lucide-react';

import { getUpcomingEvents } from '@/lib/api/events';
import type { Event } from '@/types/event';
import EventGrid from '@/components/events/EventGrid';
import { Input } from '@/components/ui/input';


type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};


const LIMIT = 9;

const EVENT_CATEGORIES = [
    'Environment',
    'Charity',
    'Healthcare',
    'Education',
    'Community',
] as const;

type EventCategory = (typeof EVENT_CATEGORIES)[number];

const EventsPage = () => {
    const [events, setEvents] = useState<Event[]>([]);
    const [pagination, setPagination] = useState<Pagination | null>(null);

    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(true);
    const [hasError, setHasError] = useState(false);
    const [retry, setRetry] = useState(0);

    const [search, setSearch] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [eventType, setEventType] = useState<EventCategory | ''>('');

    // Debounce search input
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search.trim());
            setPage(1);
        }, 350);

        return () => clearTimeout(timer);
    }, [search]);

    // Fetch events with search, category and pagination
    useEffect(() => {
        let ignore = false;

        const loadEvents = async () => {
            try {
                setIsLoading(true);
                setHasError(false);

                const result = await getUpcomingEvents({
                    page,
                    limit: LIMIT,
                    search: debouncedSearch,
                    eventType: eventType || undefined,
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
    }, [page, retry, debouncedSearch, eventType]);

    // Category filter
    const handleCategoryChange = (value: string) => {
        setEventType(value as EventCategory | '');
        setPage(1);
    };

    // Clear all filters
    const handleClearFilters = () => {
        setSearch('');
        setDebouncedSearch('');
        setEventType('');
        setPage(1);
    };

    const hasActiveFilters = Boolean(search.trim() || eventType);

    return (
        <section className="min-h-screen bg-background sm:px-6 lg:px-8 pt-20">
            <div className="mx-auto max-w-350 py-10 ">
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
                                {hasActiveFilters
                                    ? 'Matching events'
                                    : 'Total available events'}
                            </p>

                            <p className="mt-1 text-2xl font-bold tabular-nums">
                                {pagination.total}
                            </p>
                        </div>
                    )}
                </div>

                {/* Search and Filters */}
                <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center">
                    {/* Search Input */}
                    <div className="relative w-full max-w-md">
                        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

                        <Input
                            type="search"
                            placeholder="Search by title, description or location..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="h-11 rounded-full pl-10 pr-10"
                        />

                        {search && (
                            <button
                                type="button"
                                onClick={() => setSearch('')}
                                aria-label="Clear search"
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
                            >
                                <X size={16} />
                            </button>
                        )}
                    </div>

                    {/* Category Filter */}
                    <div className="relative w-full md:w-56">
                        <SlidersHorizontal className="pointer-events-none absolute left-3 top-1/2 z-10 size-4 -translate-y-1/2 text-muted-foreground" />

                        <select
                            value={eventType}
                            onChange={(e) =>
                                handleCategoryChange(e.target.value)
                            }
                            aria-label="Filter events by category"
                            className="h-11 w-full appearance-none rounded-full border border-input bg-background pl-10 pr-4 text-sm outline-none transition-colors focus:ring-2 focus:ring-ring"
                        >
                            <option value="">All Categories</option>

                            {EVENT_CATEGORIES.map((category) => (
                                <option key={category} value={category}>
                                    {category}
                                </option>
                            ))}
                        </select>
                    </div>

                    {/* Clear Filters */}
                    {hasActiveFilters && (
                        <button
                            type="button"
                            onClick={handleClearFilters}
                            className="inline-flex h-11 shrink-0 items-center justify-center gap-2 rounded-full border border-border px-5 text-sm font-medium transition-colors hover:bg-accent"
                        >
                            <X size={15} />
                            Clear Filters
                        </button>
                    )}
                </div>

                {/* Active Search Information */}
                {hasActiveFilters && (
                    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
                        <span>Active filters:</span>

                        {debouncedSearch && (
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                                Search: {debouncedSearch}
                            </span>
                        )}

                        {eventType && (
                            <span className="rounded-full bg-primary/10 px-3 py-1 text-primary">
                                Category: {eventType}
                            </span>
                        )}
                    </div>
                )}

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

                {/* Events and Empty Results */}
                {!isLoading && !hasError && (
                    <>
                        {events.length > 0 ? (
                            <>
                                <EventGrid
                                    events={events}
                                    pagination={pagination}
                                    onPageChange={setPage}
                                />

                                {pagination && (
                                    <p className="mt-6 text-center text-sm text-muted-foreground">
                                        Showing {events.length} of{' '}
                                        {pagination.total} events
                                    </p>
                                )}
                            </>
                        ) : (
                            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                                <div className="mx-auto flex size-14 items-center justify-center rounded-full bg-muted">
                                    <Search className="size-6 text-muted-foreground" />
                                </div>

                                <h3 className="mt-5 text-xl font-semibold">
                                    {hasActiveFilters
                                        ? 'No Events Found'
                                        : 'No Upcoming Events'}
                                </h3>

                                <p className="mx-auto mt-2 max-w-md text-sm leading-7 text-muted-foreground">
                                    {hasActiveFilters
                                        ? 'We could not find any events matching your filters. Try different keywords or categories.'
                                        : 'There are no upcoming events available right now. Please check back later.'}
                                </p>

                                {hasActiveFilters && (
                                    <button
                                        onClick={handleClearFilters}
                                        className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-5 py-2.5 font-medium text-primary-foreground transition-opacity hover:opacity-90"
                                    >
                                        <X size={16} />
                                        Clear Filters
                                    </button>
                                )}
                            </div>
                        )}
                    </>
                )}
            </div>
        </section>
    );
};

export default EventsPage;
