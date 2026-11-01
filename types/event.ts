export type EventType =
    | 'Environment'
    | 'Charity'
    | 'Healthcare'
    | 'Education'
    | 'Community';

export type Event = {
    _id: string;
    title: string;
    description: string;
    eventType: EventType;
    imageUrl: string;
    location: string;
    eventDate: string;
    createdBy: string;
    createdAt: string;
    updatedAt: string;
};
