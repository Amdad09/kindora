export const instant = false;
import { getUpcomingEvents } from '@/lib/api/events';
import EventGrid from '@/components/events/EventGrid';
import type { Event } from '@/types/event';

const UpcomingEventsPage = async () => {
    let events: Event[] = [];
    let hasError = false;

    try {
        events = await getUpcomingEvents();
    } catch (error) {
        console.error('Upcoming events error:', error);
        hasError = true;
    }

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
                {hasError ? (
                    <div className="rounded-2xl border border-border bg-card p-12 text-center">
                        <h2 className="text-xl font-semibold">
                            Unable to Load Events
                        </h2>
                        <p className="mt-2 text-muted-foreground">
                            Something went wrong. Please try again later.
                        </p>
                    </div>
                ) : (
                    <EventGrid events={events} />
                )}
            </div>
        </main>
    );
};

export default UpcomingEventsPage;
