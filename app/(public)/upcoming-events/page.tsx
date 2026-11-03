import EventsPage from "@/components/events/EventsPage";
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Upcoming Events | Kindora',
    description:
        'Discover upcoming community events, volunteer opportunities, charity programs, and social development activities with Kindora.',
    openGraph: {
        title: 'Upcoming Events | Kindora',
        description:
            'Explore meaningful events and make a positive impact in your community.',
        type: 'website',
        siteName: 'Kindora',
    },
};
const UpcomingEvents = () => {
  return (
    <div>
        <EventsPage />
    </div>
  );
};

export default UpcomingEvents;