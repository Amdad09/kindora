'use client';

import { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';

import {
    createEventSchema,
    type CreateEventFormValues,
} from '@/lib/validations/event.schema';

import { createEvent, updateEvent } from '@/lib/api/events';

import type { Event } from '@/types/event';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';

import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from '@/components/ui/card';

const eventTypes = [
    'Environment',
    'Charity',
    'Healthcare',
    'Education',
    'Community',
] as const;

const defaultValues: CreateEventFormValues = {
    title: '',
    description: '',
    eventType: 'Community',
    imageUrl:
        'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85',
    location: '',
    eventDate: '',
};

type CreateEventFormProps = {
    event?: Event;
};

const toLocalDateTimeInput = (date: string | Date) => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        return '';
    }

    const localDate = new Date(
        parsedDate.getTime() - parsedDate.getTimezoneOffset() * 60_000,
    );

    return localDate.toISOString().slice(0, 16);
};

export default function CreateEventForm({ event }: CreateEventFormProps) {
    const router = useRouter();

    const [serverError, setServerError] = useState('');

    const {
        register,
        handleSubmit,
        control,
        watch,
        reset,
        formState: { errors, isSubmitting },
    } = useForm<CreateEventFormValues>({
        resolver: zodResolver(createEventSchema),
        defaultValues,
    });

    // eslint-disable-next-line react-hooks/incompatible-library
    const imageUrl = watch('imageUrl');

    // Load existing event data in Edit mode
    useEffect(() => {
        if (!event) return;

        reset({
            title: event.title,
            description: event.description,
            eventType: event.eventType,
            imageUrl: event.imageUrl,
            location: event.location,
            eventDate: toLocalDateTimeInput(event.eventDate),
        });
    }, [event, reset]);

    const getLocalDateTime = () => {
        const now = new Date();
        const offset = now.getTimezoneOffset() * 60000;

        return new Date(now.getTime() - offset).toISOString().slice(0, 16);
    };

    const onSubmit = async (values: CreateEventFormValues) => {
        setServerError('');

        try {
            if (event) {
                await updateEvent(event._id, values);

                toast.success('Event updated successfully!');

                router.push('/manage-events');
                router.refresh();
            } else {
                await createEvent(values);

                toast.success('Event created successfully!');
                router.push('/upcoming-events');
                router.refresh();
                reset(defaultValues);
            }
        } catch (error) {
            const message =
                error instanceof Error ? error.message : 'Something went wrong';

            setServerError(message);
            toast.error(message);
        }
    };

    return (
        <section className="mx-auto w-full max-w-3xl mt-20 px-4 py-12 sm:py-16">
            <div className="mb-8 space-y-2">
                <p className="text-sm font-medium text-primary">
                    KINDORA / EVENT MANAGEMENT
                </p>

                <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                    {event ? 'Edit Event' : 'Create an Event'}
                </h1>

                <p className="text-muted-foreground">
                    {event
                        ? 'Update your event information and keep your community informed.'
                        : 'Bring people together and create a positive impact in your community.'}
                </p>
            </div>

            <Card className="border-border/70 shadow-sm">
                <CardHeader>
                    <CardTitle>
                        {event
                            ? 'Update Event Information'
                            : 'Event Information'}
                    </CardTitle>

                    <CardDescription>
                        {event
                            ? 'Update the details of your existing event.'
                            : 'Fill in the details below to publish your event.'}
                    </CardDescription>
                </CardHeader>

                <CardContent>
                    <form
                        onSubmit={handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        {/* Event Title */}
                        <div className="space-y-2">
                            <label
                                htmlFor="title"
                                className="text-sm font-medium"
                            >
                                Event Title
                            </label>

                            <Input
                                id="title"
                                placeholder="e.g. Community Tree Plantation"
                                {...register('title')}
                            />

                            {errors.title && (
                                <p className="text-sm text-destructive">
                                    {errors.title.message}
                                </p>
                            )}
                        </div>

                        {/* Description */}
                        <div className="space-y-2">
                            <label
                                htmlFor="description"
                                className="text-sm font-medium"
                            >
                                Description
                            </label>

                            <Textarea
                                id="description"
                                placeholder="Describe your event, its purpose and activities..."
                                rows={5}
                                {...register('description')}
                            />

                            <div className="flex justify-between">
                                {errors.description ? (
                                    <p className="text-sm text-destructive">
                                        {errors.description.message}
                                    </p>
                                ) : (
                                    <span />
                                )}

                                <span className="text-xs text-muted-foreground">
                                    {watch('description')?.length ?? 0}/2000
                                </span>
                            </div>
                        </div>

                        {/* Event Type */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium">
                                Event Category
                            </label>

                            <Controller
                                name="eventType"
                                control={control}
                                render={({ field }) => (
                                    <Select
                                        value={field.value}
                                        onValueChange={field.onChange}
                                    >
                                        <SelectTrigger className="w-full">
                                            <SelectValue placeholder="Select event category" />
                                        </SelectTrigger>

                                        <SelectContent>
                                            {eventTypes.map((type) => (
                                                <SelectItem
                                                    key={type}
                                                    value={type}
                                                >
                                                    {type}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                )}
                            />

                            {errors.eventType && (
                                <p className="text-sm text-destructive">
                                    {errors.eventType.message}
                                </p>
                            )}
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label
                                htmlFor="location"
                                className="text-sm font-medium"
                            >
                                Location
                            </label>

                            <Input
                                id="location"
                                placeholder="e.g. Dhanmondi, Dhaka"
                                {...register('location')}
                            />

                            {errors.location && (
                                <p className="text-sm text-destructive">
                                    {errors.location.message}
                                </p>
                            )}
                        </div>

                        {/* Event Date */}
                        <div className="space-y-2">
                            <label
                                htmlFor="eventDate"
                                className="text-sm font-medium"
                            >
                                Event Date & Time
                            </label>

                            <Input
                                id="eventDate"
                                type="datetime-local"
                                min={getLocalDateTime()}
                                {...register('eventDate', {
                                    validate: (value) =>
                                        new Date(value).getTime() >
                                            Date.now() ||
                                        'Event date must be in the future',
                                })}
                            />

                            {errors.eventDate && (
                                <p className="text-sm text-destructive">
                                    {errors.eventDate.message}
                                </p>
                            )}
                        </div>

                        {/* Image URL */}
                        <div className="space-y-2">
                            <label
                                htmlFor="imageUrl"
                                className="text-sm font-medium"
                            >
                                Event Cover Image URL
                            </label>

                            <Input
                                id="imageUrl"
                                type="url"
                                placeholder="https://example.com/event-image.jpg"
                                {...register('imageUrl')}
                            />

                            {errors.imageUrl && (
                                <p className="text-sm text-destructive">
                                    {errors.imageUrl.message}
                                </p>
                            )}

                            {imageUrl && !errors.imageUrl && (
                                <div
                                    className="mt-3 aspect-video w-full rounded-xl border bg-muted bg-cover bg-center"
                                    style={{
                                        backgroundImage: `url("${imageUrl}")`,
                                    }}
                                    role="img"
                                    aria-label="Event cover image preview"
                                />
                            )}
                        </div>

                        {/* Server Error */}
                        {serverError && (
                            <div
                                role="alert"
                                className="rounded-lg border border-destructive/30 bg-destructive/5 p-3 text-sm text-destructive"
                            >
                                {serverError}
                            </div>
                        )}

                        {/* Submit */}
                        <Button
                            type="submit"
                            className="w-full"
                            disabled={isSubmitting}
                        >
                            {isSubmitting
                                ? event
                                    ? 'Updating Event...'
                                    : 'Creating Event...'
                                : event
                                  ? 'Update Event'
                                  : 'Create Event'}
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </section>
    );
}
