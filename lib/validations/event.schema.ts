import { z } from 'zod';

export const createEventSchema = z.object({
    title: z
        .string()
        .trim()
        .min(5, 'Title must be at least 5 characters')
        .max(100, 'Title cannot exceed 100 characters'),

    description: z
        .string()
        .trim()
        .min(20, 'Description must be at least 20 characters')
        .max(2000, 'Description cannot exceed 2000 characters'),

    eventType: z.enum([
        'Environment',
        'Charity',
        'Healthcare',
        'Education',
        'Community',
    ]),

    imageUrl: z.url('Please provide a valid image URL'),

    location: z
        .string()
        .trim()
        .min(3, 'Location must be at least 3 characters'),

    eventDate: z
        .string()
        .min(1, 'Event date is required')
        .refine(
            (value) => !Number.isNaN(new Date(value).getTime()),
            'Please provide a valid event date',
        ),
});

export type CreateEventFormValues = z.infer<typeof createEventSchema>;
