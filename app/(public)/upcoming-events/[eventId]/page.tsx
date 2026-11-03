import { Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
    ArrowLeft,
    CalendarDays,
    Clock3,
    MapPin,
    Tag,
    Users,
    Info,
    HeartHandshake,
} from 'lucide-react';

import { getEventById, getUpcomingEvents } from '@/lib/api/events';

import EventDetailsActions from '@/components/events/EventsDetailsAction';

type EventDetailsPageProps = {
    params: Promise<{ eventId: string }>;
};

const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });
};

const formatTime = (date: string) => {
    return new Date(date).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
    });
};

const EventDetailsContent = async ({ params }: EventDetailsPageProps) => {
    const { eventId } = await params;

    let event: Awaited<ReturnType<typeof getEventById>> | null = null;

    try {
        event = await getEventById(eventId);
    } catch (error) {
        console.error('Event details error:', error);
    }

    if (!event) {
        return (
            <div className="rounded-2xl border bg-card p-10 text-center">
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

    let similarEvents: (typeof event)[] = [];

    try {
        const result = await getUpcomingEvents({
            page: 1,
            limit: 6,
        });

        similarEvents = result.data
            .filter(
                (item) =>
                    item._id !== event._id &&
                    item.eventType === event.eventType,
            )
            .slice(0, 2);
    } catch (error) {
        console.error('Similar events error:', error);
    }

    return (
        <article className="mx-auto mt-30 max-w-6xl overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
            {/* Hero Image */}
            <div className="relative h-56 sm:h-72 lg:h-80">
                <Image
                    src={event.imageUrl}
                    alt={event.title}
                    fill
                    priority
                    sizes="(min-width: 1280px) 1152px, 100vw"
                    className="object-cover"
                />

                <div className="absolute inset-0 bg-linear-to-t from-black/65 via-black/10 to-black/25" />

                <Link
                    href="/upcoming-events"
                    className="absolute left-5 top-5 inline-flex items-center gap-2 rounded-full bg-black/45 px-4 py-2 text-sm font-medium text-white backdrop-blur-md transition hover:bg-black/65"
                >
                    <ArrowLeft size={16} />
                    Back to Events
                </Link>

                <span className="absolute bottom-5 left-5 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-primary shadow-sm backdrop-blur">
                    {event.eventType}
                </span>
            </div>

            {/* Main Content */}
            <div className="p-5 sm:p-8 lg:p-10">
                {/* Event Heading and Quick Information */}
                <div className="grid gap-7 lg:grid-cols-[1fr_240px] lg:items-start">
                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-foreground sm:text-3xl">
                            {event.title}
                        </h1>

                        <div className="mt-5 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <MapPin
                                    size={17}
                                    className="shrink-0 text-primary"
                                />
                                <span>{event.location}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Tag
                                    size={17}
                                    className="shrink-0 text-primary"
                                />
                                <span>{event.eventType}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <CalendarDays
                                    size={17}
                                    className="shrink-0 text-primary"
                                />
                                <span>{formatDate(event.eventDate)}</span>
                            </div>

                            <div className="flex items-center gap-2">
                                <Clock3
                                    size={17}
                                    className="shrink-0 text-primary"
                                />
                                <span>{formatTime(event.eventDate)}</span>
                            </div>
                        </div>
                    </div>

                    {/* Join Event */}
                    <div className="lg:pt-0">
                        <EventDetailsActions eventId={eventId} event={event} />
                    </div>
                </div>

                {/* Description and Organizer */}
                <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_280px]">
                    {/* Left Content */}
                    <div className="space-y-9">
                        {/* About */}
                        <section>
                            <div className="mb-3 flex items-center gap-2">
                                <Info size={19} className="text-primary" />
                                <h2 className="text-xl font-bold">
                                    About This Event
                                </h2>
                            </div>

                            <p className="whitespace-pre-line text-sm leading-7 text-muted-foreground">
                                {event.description}
                            </p>
                        </section>

                        {/* Event Details */}
                        <section>
                            <h2 className="mb-5 text-xl font-bold">
                                Event Details
                            </h2>

                            <div className="grid gap-5 sm:grid-cols-2">
                                <div className="flex items-start gap-3">
                                    <Users
                                        size={18}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Organizer
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            Kindora Community
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <MapPin
                                        size={18}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Location
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {event.location}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <Tag
                                        size={18}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Event Type
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {event.eventType}
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-start gap-3">
                                    <CalendarDays
                                        size={18}
                                        className="mt-0.5 shrink-0 text-primary"
                                    />
                                    <div>
                                        <p className="text-xs text-muted-foreground">
                                            Event Date
                                        </p>
                                        <p className="mt-1 text-sm font-semibold">
                                            {formatDate(event.eventDate)}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </section>

                        {/* Community Message */}
                        <section className="rounded-xl border border-primary/15 bg-primary/5 p-5">
                            <div className="flex items-start gap-3">
                                <HeartHandshake
                                    className="mt-0.5 shrink-0 text-primary"
                                    size={22}
                                />

                                <div>
                                    <h3 className="font-semibold">
                                        Be Part of Something Meaningful
                                    </h3>

                                    <p className="mt-2 text-sm leading-6 text-muted-foreground">
                                        Every small contribution can create a
                                        positive impact. Join this community
                                        initiative and help make a difference.
                                    </p>
                                </div>
                            </div>
                        </section>
                    </div>

                    {/* Right Organizer Card */}
                    <aside className="h-fit rounded-2xl border border-border bg-background p-5 shadow-sm">
                        <h2 className="text-base font-bold">Event Organizer</h2>

                        <div className="mt-5 flex items-center gap-3">
                            <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Users size={21} />
                            </div>

                            <div>
                                <p className="text-sm font-semibold">
                                    Community Organizer
                                </p>
                                <p className="text-xs text-muted-foreground">
                                    Kindora Community
                                </p>
                            </div>
                        </div>

                        <p className="mt-5 text-sm leading-6 text-muted-foreground">
                            Bringing people together to create positive changes
                            in our communities.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-5 flex w-full items-center justify-center rounded-lg border border-primary/40 px-4 py-2.5 text-sm font-semibold text-primary transition hover:bg-primary hover:text-primary-foreground"
                        >
                            Explore Events
                        </Link>
                    </aside>
                </div>

                {/* Similar Events */}
                {similarEvents.length > 0 && (
                    <section className="mt-12 border-t border-border pt-8">
                        <div className="mb-5 flex items-center justify-between">
                            <h2 className="text-xl font-bold">
                                Similar Events
                            </h2>

                            <Link
                                href="/upcoming-events"
                                className="text-sm font-semibold text-primary hover:underline"
                            >
                                View All
                            </Link>
                        </div>

                        <div className="grid gap-4 sm:grid-cols-2">
                            {similarEvents.map((item) => (
                                <Link
                                    key={item._id}
                                    href={`/upcoming-events/${item._id}`}
                                    className="group flex gap-3 rounded-xl border border-border p-3 transition hover:border-primary/40 hover:shadow-sm"
                                >
                                    <div className="relative h-20 w-24 shrink-0 overflow-hidden rounded-lg">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.title}
                                            fill
                                            sizes="96px"
                                            className="object-cover transition duration-300 group-hover:scale-105"
                                        />
                                    </div>

                                    <div className="min-w-0 py-1">
                                        <h3 className="line-clamp-2 text-sm font-semibold transition group-hover:text-primary">
                                            {item.title}
                                        </h3>

                                        <p className="mt-2 flex items-center gap-1 text-xs text-muted-foreground">
                                            <MapPin size={12} />
                                            <span className="truncate">
                                                {item.location}
                                            </span>
                                        </p>

                                        <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                            <CalendarDays size={12} />
                                            {formatDate(item.eventDate)}
                                        </p>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </section>
                )}
            </div>
        </article>
    );
};

const EventDetailsPage = ({ params }: EventDetailsPageProps) => {
    return (
        <main className="min-h-screen px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl">
                <Suspense
                    fallback={
                        <div className="animate-pulse overflow-hidden rounded-2xl border border-border bg-card">
                            <div className="h-56 bg-muted sm:h-72" />
                            <div className="space-y-5 p-8">
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
