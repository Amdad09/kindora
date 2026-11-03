import { Suspense } from 'react';
import { getUpcomingEvents } from '@/lib/api/events';
import EventGrid from '@/components/events/EventGrid';
import type { Event } from '@/types/event';
import { Card, CardContent } from '@/components/ui/card';
import { connection } from 'next/server';
async function UpcomingEventsContent() {
    await connection();
    let events: Event[] = [];
    let hasError = false;

    try {
        events = await getUpcomingEvents();
    } catch (error) {
        console.error('Upcoming events error:', error);
        hasError = true;
    }

    if (hasError) {
        return (
            <div className="rounded-2xl border border-border bg-card p-12 text-center">
                <h2 className="text-xl font-semibold">Unable to Load Events</h2>
                <p className="mt-2 text-muted-foreground">
                    Something went wrong. Please try again later.
                </p>
            </div>
        );
    }

    return <EventGrid events={events} />;
}

const UpcomingEventsPage = () => {
    return (
        <main className="min-h-screen px-4 py-16 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-350">
                {/* Page Header */}
                <div className="mb-12 text-center">
                    <p className="mb-3 font-semibold tracking-wider text-primary">
                        MAKE A DIFFERENCE
                    </p>

                    <h1 className="text-3xl font-bold tracking-tight sm:text-5xl">
                        Upcoming Events
                    </h1>

                    <p className="mx-auto mt-4 max-w-2xl text-muted-foreground">
                        Discover meaningful community events, connect with
                        people, and become part of something bigger.
                    </p>
                </div>

                {/* Events */}
                <Suspense
                    fallback={
                       
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3,4,5,6].map((item) => (
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
          
                    }
                >
                    <UpcomingEventsContent />
                </Suspense>
            </div>
        </main>
    );
};

export default UpcomingEventsPage;
