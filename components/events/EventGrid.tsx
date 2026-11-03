'use client'
import type { Event } from '@/types/event';
import EventCard from './EventCard';
import CardMotion from '../shared/CardMotion';

type Pagination = {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
};

type EventGridProps = {
    events: Event[];
    pagination: Pagination | null;
    onPageChange: (page: number) => void;
};

const EventGrid = ({ events, pagination, onPageChange }: EventGridProps) => {
    if (events.length === 0) {
        return (
            <div className="rounded-2xl border border-border bg-card px-6 py-16 text-center">
                <h3 className="text-xl font-semibold">No Upcoming Events</h3>
                <p className="mt-2 text-muted-foreground">
                    Check back soon for new community events.
                </p>
            </div>
        );
    }
    return (
        <div className="space-y-10">
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {events.map((event) => {
                    

                    return (
                        <CardMotion key={event._id}>
                            <EventCard event={event} />
                        </CardMotion>
                    );
                })}
            </div>

            {pagination && pagination.totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                    <button
                        disabled={pagination.page <= 1}
                        onClick={() => onPageChange(pagination.page - 1)}
                        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Previous
                    </button>

                    <span className="text-sm text-muted-foreground">
                        Page {pagination.page} of {pagination.totalPages}
                    </span>

                    <button
                        disabled={pagination.page >= pagination.totalPages}
                        onClick={() => onPageChange(pagination.page + 1)}
                        className="rounded-lg border px-4 py-2 disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default EventGrid;
