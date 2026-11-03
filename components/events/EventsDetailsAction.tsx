'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { Heart } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
    getJoinedEvents,
    joinEvent,
    leaveEvent,
} from '@/lib/api/events';
import { useSession } from '@/lib/auth-client';
import type { Event } from '@/types/event';

type Props = {
    eventId: string;
    event: Event;
};

const EventDetailsActions = ({ eventId, event }: Props) => {
    const router = useRouter();

    const [isJoined, setIsJoined] = useState(false);
    const [loading, setLoading] = useState(false);
    const [checking, setChecking] = useState(true);

    const { data: session, isPending } = useSession();

    const isOwner = Boolean(
        session?.user.id && event.createdBy === session.user.id,
    );

    useEffect(() => {
        let cancelled = false;

        const checkRegistration = async () => {
            if (isPending) return;

            if (!session || isOwner) {
                setIsJoined(false);
                setChecking(false);
                return;
            }

            setChecking(true);

            try {
                const events = await getJoinedEvents();

                if (!cancelled) {
                    setIsJoined(
                        events.some(
                            (item: { _id: string }) =>
                                item._id === eventId,
                        ),
                    );
                }
            } catch {
                if (!cancelled) {
                    setIsJoined(false);
                }
            } finally {
                if (!cancelled) {
                    setChecking(false);
                }
            }
        };

        checkRegistration();

        return () => {
            cancelled = true;
        };
    }, [eventId, session?.user.id, isPending, isOwner, session]);

    const handleJoin = async () => {
        if (!session) {
            router.push('/login');
            return;
        }

        try {
            setLoading(true);

            await joinEvent(eventId);

            setIsJoined(true);
            toast.success('You joined this event successfully!');
        } catch (error) {
            toast.error(
                error instanceof Error
                    ? error.message
                    : 'Something went wrong',
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
                error instanceof Error
                    ? error.message
                    : 'Something went wrong',
            );
        } finally {
            setLoading(false);
        }
    };

    const buttonText = isOwner
        ? 'Your Event'
        : isPending || checking
          ? 'Checking...'
          : loading
            ? 'Please wait...'
            : isJoined
              ? 'Leave Event'
              : 'Join Event';

    return (
        <>
            <Button
                type="button"
                className={`w-full rounded-full ${
                    isJoined && !isOwner
                        ? 'border-red-500/60 text-red-600 hover:border-red-600 hover:bg-red-50 hover:text-red-700 dark:hover:bg-red-950/30'
                        : ''
                }`}
                variant={
                    isOwner
                        ? 'secondary'
                        : isJoined
                          ? 'outline'
                          : 'default'
                }
                disabled={
                    isOwner ||
                    isPending ||
                    loading ||
                    checking
                }
                onClick={
                    isOwner
                        ? undefined
                        : isJoined
                          ? handleLeave
                          : handleJoin
                }
            >
                <Heart
                    className={`mr-2 size-4 ${
                        isJoined && !isOwner
                            ? 'fill-red-500 text-red-500'
                            : ''
                    }`}
                />

                {buttonText}
            </Button>

            <p className="mt-3 text-center text-xs leading-5 text-muted-foreground">
                {isOwner
                    ? 'You created this event.'
                    : !session
                      ? 'Sign in to join this event and make a positive impact.'
                      : isJoined
                        ? 'You are registered for this event.'
                        : 'Join this event and make a positive impact.'}
            </p>
        </>
    );
};

export default EventDetailsActions;