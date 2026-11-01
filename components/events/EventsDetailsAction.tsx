'use client';

import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { getJoinedEvents, joinEvent, leaveEvent } from '@/lib/api/events';

type Props = {
    eventId: string;
};

const EventDetailsActions = ({ eventId }: Props) => {
    const [isJoined, setIsJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    useEffect(() => {
        const checkRegistration = async () => {
            try {
                const events = await getJoinedEvents();

                setIsJoined(
                    events.some(
                        (event: { _id: string }) => event._id === eventId,
                    ),
                );
            } catch {
                setIsJoined(false);
            } finally {
                setChecking(false);
            }
        };

        checkRegistration();
    }, [eventId]);

    const handleJoin = async () => {
        try {
            setLoading(true);

            await joinEvent(eventId);

            setIsJoined(true);

            toast.success('You joined this event successfully!');
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    const handleLeave = async () => {
        try {
            setLoading(true);

            await leaveEvent(eventId);

            setIsJoined(false);

            toast.success('You left this event successfully!');
        } catch (error) {
            toast.error(
                error instanceof Error ? error.message : 'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Button
                type="button"
                className="mt-7 w-full rounded-full"
                variant={isJoined ? 'outline' : 'default'}
                disabled={loading || checking}
                onClick={isJoined ? handleLeave : handleJoin}
            >
                <Heart className="mr-2 size-4" />

                {checking
                    ? 'Checking...'
                    : loading
                      ? 'Please wait...'
                      : isJoined
                        ? 'Leave Event'
                        : 'Join Event'}
            </Button>

            <p className="mt-3 text-center text-xs text-muted-foreground">
                {isJoined
                    ? 'You are registered for this event.'
                    : 'Join this event and make a positive impact.'}
            </p>
        </>
    );
};

export default EventDetailsActions;
