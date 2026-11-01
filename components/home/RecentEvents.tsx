
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';
import { getUpcomingEvents } from '@/lib/api/events';
import type { Event } from '@/types/event';
import EventCard from '../events/EventCard';
import { connection } from 'next/server';

const RecentEvents = async () => {
    await connection()
    let events: Event[] = [];
    try {
        events = await getUpcomingEvents(6);
    } catch (error) {
        console.error('Upcoming events error:', error);
    }

    return (
        <section className="px-4 py-20 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-350">
                <div className="mb-10 flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <p className="mb-3 font-semibold text-primary">
                            MAKE A DIFFERENCE
                        </p>

                        <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            Upcoming Events
                        </h2>

                        <p className="mt-3 max-w-xl text-muted-foreground">
                            Discover meaningful events and become part of
                            something bigger.
                        </p>
                    </div>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center gap-2 font-semibold text-primary hover:gap-3 transition-all"
                    >
                        View All Events
                        <ArrowRight size={18} />
                    </Link>
                </div>

                {events.length === 0 ? (
                    <div className="rounded-2xl border border-border bg-card p-12 text-center">
                        <h3 className="text-xl font-semibold">
                            No Upcoming Events
                        </h3>
                        <p className="mt-2 text-muted-foreground">
                            Check back soon for new community events.
                        </p>
                    </div>
                ) : (
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                        {events.map((event) => (
                            <EventCard key={event._id} event={event} />
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentEvents;
