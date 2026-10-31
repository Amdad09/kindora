import type { Event } from '@/types/event';
import EventCard from './EventCard';

type EventGridProps = {
    events: Event[];
};

const EventGrid = ({ events }: EventGridProps) => {
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
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {events.map((event) => (
                <EventCard key={event._id} event={event} />
            ))}
        </div>
    );
};

export default EventGrid;
