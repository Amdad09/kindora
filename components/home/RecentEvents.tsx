
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, CalendarDays, ArrowRight } from 'lucide-react';
import { getUpcomingEvents } from '@/lib/api/events';
import type { Event } from '@/types/event';

const RecentEvents = async () => {
    let events: Event[] = [];
    try {
        events = await getUpcomingEvents();
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
                        {events.slice(0, 6).map((event) => (
                            <article
                                key={event._id}
                                className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                            >
                                <div className="relative aspect-16/10 overflow-hidden">
                                    <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />

                                    <span className="absolute left-4 top-4 rounded-full bg-card/90 px-3 py-1.5 text-xs font-semibold text-primary backdrop-blur">
                                        {event.eventType}
                                    </span>
                                </div>

                                <div className="p-5">
                                    <h3 className="line-clamp-1 text-xl font-bold">
                                        {event.title}
                                    </h3>

                                    <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                        {event.description}
                                    </p>

                                    <div className="mt-5 space-y-3 text-sm text-muted-foreground">
                                        <div className="flex items-center gap-2">
                                            <CalendarDays
                                                size={17}
                                                className="text-primary"
                                            />
                                            {new Date(
                                                event.eventDate,
                                            ).toLocaleDateString('en-US', {
                                                day: 'numeric',
                                                month: 'long',
                                                year: 'numeric',
                                            })}
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <MapPin
                                                size={17}
                                                className="text-primary"
                                            />
                                            {event.location}
                                        </div>
                                    </div>

                                    <Link
                                        href={`/upcoming-events/${event._id}`}
                                        className="mt-6 flex items-center justify-between border-t border-border pt-4 font-semibold text-primary"
                                    >
                                        View Details
                                        <ArrowRight size={18} />
                                    </Link>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </div>
        </section>
    );
};

export default RecentEvents;
