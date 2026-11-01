'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';

import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';

import { getEventById } from '@/lib/api/events';
import type { Event } from '@/types/event';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import CreateEventForm from '@/components/events/CreateEventForm';

const EditEventPage = () => {
    const router = useRouter();
    const params = useParams<{ id: string }>();

    const eventId = params.id;

    const [event, setEvent] = useState<Event | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        let active = true;

        const fetchEvent = async () => {
            try {
                setLoading(true);
                setError('');

                const result = await getEventById(eventId);

                if (active) {
                    setEvent(result);
                }
            } catch (err) {
                if (!active) return;

                setError(
                    err instanceof Error ? err.message : 'Failed to load event',
                );
            } finally {
                if (active) {
                    setLoading(false);
                }
            }
        };

        fetchEvent();

        return () => {
            active = false;
        };
    }, [eventId]);

    return (
        <section className="min-h-screen bg-background">
            <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <Button
                        variant="ghost"
                        className="mb-4 -ml-3"
                        onClick={() => router.push('/manage-events')}
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Manage Events
                    </Button>

                    <h1 className="text-3xl font-bold tracking-tight">
                        Edit Event
                    </h1>

                    <p className="mt-2 text-muted-foreground">
                        Update your event information.
                    </p>
                </div>

                {/* Loading */}
                {loading && (
                    <Card>
                        <CardContent className="flex items-center justify-center gap-3 py-16">
                            <Loader2 className="size-5 animate-spin text-primary" />
                            <p className="text-sm text-muted-foreground">
                                Loading event details...
                            </p>
                        </CardContent>
                    </Card>
                )}

                {/* Error */}
                {!loading && error && (
                    <Card>
                        <CardContent className="flex flex-col items-center gap-4 py-12 text-center">
                            <AlertCircle className="size-10 text-destructive" />

                            <h2 className="text-lg font-semibold">
                                Unable to load event
                            </h2>

                            <p className="text-sm text-muted-foreground">
                                {error}
                            </p>

                            <Button
                                variant="outline"
                                onClick={() => router.push('/manage-events')}
                            >
                                Back to Manage Events
                            </Button>
                        </CardContent>
                    </Card>
                )}

                {/* Edit Form */}
                {!loading && !error && event && (
                    <CreateEventForm event={event} />
                )}
            </div>
        </section>
    );
};

export default EditEventPage;
