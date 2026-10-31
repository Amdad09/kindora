
import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MapPin, CalendarDays, ArrowLeft, Heart } from 'lucide-react';

import { getEventById } from '@/lib/api/events';

type EventDetailsPageProps = {
    params: Promise<{ eventId: string }>;
};

const EventDetailsContent = async ({ params }: EventDetailsPageProps) => {
    const { eventId } = await params;
    let event;

    try {
        event = await getEventById(eventId);
    } catch (error) {
        console.error('Event details error:', error);

        return (
            <div className="rounded-2xl border border-border bg-card p-10 text-center">
                <h2 className="text-2xl font-bold">Event Not Found</h2>

                <p className="mt-3 text-muted-foreground">
                    This event may have been removed or the link is invalid.
                </p>

                <Link
                    href="/upcoming-events"
                    className="mt-6 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground"
                >
                    <ArrowLeft size={18} />
                    Browse Events
                </Link>
            </div>
        );
    }

    return (
        <article className="overflow-hidden rounded-3xl border border-border bg-card">
            {/* Event Image */}
            <div className="relative aspect-video overflow-hidden">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1200px, 100vw"
                    className="object-cover"
                />

                <span className="absolute left-5 top-5 rounded-full bg-card/90 px-4 py-2 text-sm font-semibold text-primary backdrop-blur">
                    {event.eventType}
                </span>
            </div>

            {/* Event Information */}
            <div className="p-6 sm:p-10">
                <div className="grid gap-8 lg:grid-cols-[1fr_280px]">
                    <div>
                        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                            {event.title}
                        </h1>

                        <p className="mt-6 whitespace-pre-line leading-8 text-muted-foreground">
                            {event.description}
                        </p>
                    </div>

                    {/* Event Details */}
                    <aside className="h-fit rounded-2xl border border-border bg-background p-5">
                        <h2 className="text-lg font-bold">Event Information</h2>

                        <div className="mt-5 space-y-5">
                            <div className="flex items-start gap-3">
                                <CalendarDays
                                    size={20}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Event Date
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {new Date(
                                            event.eventDate,
                                        ).toLocaleDateString('en-US', {
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        })}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start gap-3">
                                <MapPin
                                    size={20}
                                    className="mt-0.5 shrink-0 text-primary"
                                />

                                <div>
                                    <p className="text-sm text-muted-foreground">
                                        Location
                                    </p>

                                    <p className="mt-1 font-semibold">
                                        {event.location}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <button
                            type="button"
                            disabled
                            className="mt-7 flex w-full items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 font-semibold text-primary-foreground opacity-70"
                        >
                            <Heart size={18} />
                            Join Event
                        </button>

                        <p className="mt-3 text-center text-xs text-muted-foreground">
                            Event registration will be available soon.
                        </p>
                    </aside>
                </div>
            </div>
        </article>
    );
};

const EventDetailsPage = ({ params }: EventDetailsPageProps) => {
    return (
        <main className="min-h-screen px-4 py-12 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Link
                    href="/upcoming-events"
                    className="mb-6 inline-flex items-center gap-2 font-semibold text-primary transition-all hover:gap-3"
                >
                    <ArrowLeft size={18} />
                    Back to Events
                </Link>

                <Suspense
                    fallback={
                        <div className="animate-pulse overflow-hidden rounded-3xl border border-border bg-card">
                            <div className="aspect-video bg-muted" />
                            <div className="space-y-4 p-8">
                                <div className="h-8 w-2/3 rounded-lg bg-muted" />
                                <div className="h-4 w-full rounded-lg bg-muted" />
                                <div className="h-4 w-4/5 rounded-lg bg-muted" />
                            </div>
                        </div>
                    }
                >
                    <EventDetailsContent params={params} />
                </Suspense>
            </div>
        </main>
    );
};

export default EventDetailsPage;
