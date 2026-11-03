/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import { getJoinedEvents, getMyEvents } from '@/lib/api/events';
import { updateUser, useSession } from '@/lib/auth-client';
import {
    ArrowRight,
    CalendarCheck,
    CalendarDays,
    ImagePlus,
    Loader2,
    Mail,
    MapPin,
    Pencil,
    Plus,
    UserRound,
    X,
} from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

type ProfileEvent = {
    _id: string;
    title: string;
    description: string;
    eventType: string;
    imageUrl: string;
    location: string;
    eventDate: string;
};

const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
    });

const getInitials = (name: string) =>
    name
        .split(' ')
        .filter(Boolean)
        .slice(0, 2)
        .map((part) => part[0])
        .join('')
        .toUpperCase();

const ProfilePage = () => {
    const { data: session, isPending } = useSession();

    const [myEvents, setMyEvents] = useState<ProfileEvent[]>([]);
    const [joinedEvents, setJoinedEvents] = useState<ProfileEvent[]>([]);
    const [eventsLoading, setEventsLoading] = useState(true);

    const [isEditOpen, setIsEditOpen] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const [name, setName] = useState('');
    const [image, setImage] = useState('');

    const user = session?.user;

    useEffect(() => {
        if (!user) return;

        setName(user.name || '');
        setImage(user.image || '');
    }, [user]);

    useEffect(() => {
        if (!user) return;

        const loadEvents = async () => {
            try {
                setEventsLoading(true);

                const [created, joined] = await Promise.allSettled([
                    getMyEvents(),
                    getJoinedEvents(),
                ]);

                if (created.status === 'fulfilled') {
                    setMyEvents(
                        Array.isArray(created.value) ? created.value : [],
                    );
                } else {
                    setMyEvents([]);
                }

                if (joined.status === 'fulfilled') {
                    setJoinedEvents(
                        Array.isArray(joined.value) ? joined.value : [],
                    );
                } else {
                    setJoinedEvents([]);
                }
            } catch (error) {
                console.error('Profile events error:', error);
            } finally {
                setEventsLoading(false);
            }
        };

        loadEvents();
    }, [user]);

    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const trimmedName = name.trim();
        const trimmedImage = image.trim();

        if (!trimmedName) {
            toast.error('Name is required');
            return;
        }

        if (trimmedImage) {
            try {
                const url = new URL(trimmedImage);

                if (!['http:', 'https:'].includes(url.protocol)) {
                    throw new Error('Invalid URL');
                }
            } catch {
                toast.error('Please enter a valid image URL');
                return;
            }
        }

        try {
            setIsSaving(true);

            const { error } = await updateUser({
                name: trimmedName,
                image: trimmedImage || '',
            });

            if (error) {
                toast.error(error.message || 'Failed to update profile');
                return;
            }

            toast.success('Profile updated successfully');
            setIsEditOpen(false);
        } catch (error) {
            console.error('Profile update error:', error);
            toast.error('Something went wrong');
        } finally {
            setIsSaving(false);
        }
    };

    if (isPending) {
        return (
            <main className="min-h-screen px-4 py-12">
                <div className="mx-auto max-w-6xl animate-pulse space-y-6">
                    <div className="h-48 rounded-3xl bg-muted" />
                    <div className="h-64 rounded-3xl bg-muted" />
                </div>
            </main>
        );
    }

    if (!user) {
        return (
            <main className="flex min-h-[70vh] items-center justify-center px-4">
                <div className="max-w-md text-center">
                    <UserRound
                        className="mx-auto mb-4 text-muted-foreground"
                        size={40}
                    />
                    <h1 className="text-2xl font-bold">Please login first</h1>
                    <p className="mt-2 text-muted-foreground">
                        Login to view your profile and manage your events.
                    </p>
                    <Link
                        href="/login"
                        className="mt-6 inline-flex rounded-xl bg-primary px-6 py-3 font-semibold text-primary-foreground"
                    >
                        Log In
                    </Link>
                </div>
            </main>
        );
    }

    return (
        <main className="min-h-screen bg-background pt-30 px-4 py-10 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-6xl space-y-8">
                {/* Page Heading */}
                <div>
                    <p className="text-sm font-semibold uppercase tracking-widest text-primary">
                        Account
                    </p>
                    <h1 className="mt-2 text-3xl font-bold tracking-tight sm:text-4xl">
                        My Profile
                    </h1>
                    <p className="mt-2 text-muted-foreground">
                        Manage your personal information and keep track of your
                        activities.
                    </p>
                </div>

                {/* Profile Card */}
                <section className="overflow-hidden rounded-3xl border border-border bg-card shadow-sm">
                    {/* Cover */}
                    <div className="relative h-40 overflow-hidden bg-linear-to-r from-primary/30 via-primary/15 to-brand-accent/30 sm:h-52">
                        <div className="absolute -right-10 -top-24 h-72 w-72 rounded-full border-40 border-white/10" />
                        <div className="absolute -bottom-28 left-1/3 h-64 w-64 rounded-full border-35 border-white/10" />
                    </div>

                    {/* Profile Information */}
                    <div className="relative px-5 pb-7 sm:px-8">
                        <div className="-mt-14 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
                            <div className="flex items-end gap-4">
                                <div className="flex h-28 w-28 shrink-0 items-center justify-center overflow-hidden rounded-3xl border-4 border-card bg-primary text-3xl font-bold text-primary-foreground shadow-lg sm:h-32 sm:w-32">
                                    {user.image ? (
                                        <Image
                                            src={user.image}
                                            alt={user.name || 'Profile'}
                                            width={128}
                                            height={128}
                                            unoptimized
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        getInitials(user.name || 'User')
                                    )}
                                </div>

                                <div className="min-w-0 pb-1">
                                    <h2 className="truncate text-xl font-bold sm:text-2xl">
                                        {user.name || 'User'}
                                    </h2>
                                    <p className="mt-1 truncate text-sm text-muted-foreground">
                                        {user.email}
                                    </p>
                                    <span className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                                        <span className="h-1.5 w-1.5 rounded-full bg-primary" />
                                        Kindora Member
                                    </span>
                                </div>
                            </div>

                            <button
                                onClick={() => setIsEditOpen(true)}
                                className="inline-flex items-center justify-center gap-2 rounded-xl border border-border bg-background px-5 py-3 text-sm font-semibold transition-colors hover:bg-muted"
                            >
                                <Pencil size={16} />
                                Edit Profile
                            </button>
                        </div>

                        <div className="mt-8 grid gap-4 border-t border-border pt-6 sm:grid-cols-2">
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Mail size={18} />
                                </div>
                                <div className="min-w-0">
                                    <p className="text-xs text-muted-foreground">
                                        Email Address
                                    </p>
                                    <p className="truncate text-sm font-medium">
                                        {user.email}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <UserRound size={18} />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">
                                        Account ID
                                    </p>
                                    <p className="text-sm font-medium">
                                        {user.id.slice(0, 12)}...
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Activity Statistics */}
                <section className="grid gap-4 sm:grid-cols-2">
                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                                <CalendarDays size={23} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Created by you
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-bold">
                            {eventsLoading ? '—' : myEvents.length}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            My Events
                        </p>
                    </div>

                    <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
                        <div className="flex items-center justify-between">
                            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-brand-accent/10 text-brand-accent">
                                <CalendarCheck size={23} />
                            </div>
                            <span className="text-xs font-medium text-muted-foreground">
                                Events you joined
                            </span>
                        </div>
                        <p className="mt-5 text-3xl font-bold">
                            {eventsLoading ? '—' : joinedEvents.length}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                            Joined Events
                        </p>
                    </div>
                </section>

                {/* My Events */}
                <EventSection
                    title="My Events"
                    description="Events you have created and organized."
                    events={myEvents.slice(0, 3)}
                    loading={eventsLoading}
                    emptyText="You haven't created any events yet."
                    emptyAction="Create your first event"
                    emptyHref="/create-event"
                    viewAllHref="/manage-events"
                />

                {/* Joined Events */}
                <EventSection
                    title="Joined Events"
                    description="Events you are participating in."
                    events={joinedEvents.slice(0, 3)}
                    loading={eventsLoading}
                    emptyText="You haven't joined any events yet."
                    emptyAction="Explore upcoming events"
                    emptyHref="/upcoming-events"
                    viewAllHref="/joined-events"
                />
            </div>

            {/* Edit Profile Modal */}
            {isEditOpen && (
                <div
                    className="fixed inset-0 z-100 flex items-center justify-center bg-black/60 px-4 py-6 backdrop-blur-sm"
                    onMouseDown={(e) => {
                        if (e.target === e.currentTarget && !isSaving) {
                            setIsEditOpen(false);
                        }
                    }}
                >
                    <div className="w-full max-w-lg rounded-3xl border border-border bg-card p-6 shadow-2xl sm:p-8">
                        <div className="mb-7 flex items-center justify-between">
                            <div>
                                <h2 className="text-xl font-bold">
                                    Edit Profile
                                </h2>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    Update your personal information.
                                </p>
                            </div>
                            <button
                                onClick={() => setIsEditOpen(false)}
                                disabled={isSaving}
                                className="rounded-xl p-2 transition-colors hover:bg-muted"
                                aria-label="Close edit profile"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form
                            onSubmit={handleUpdateProfile}
                            className="space-y-5"
                        >
                            <div className="flex items-center gap-4">
                                <div className="flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl bg-primary/10 text-xl font-bold text-primary">
                                    {image ? (
                                        <img
                                            src={image}
                                            alt="Profile preview"
                                            className="h-full w-full object-cover"
                                        />
                                    ) : (
                                        getInitials(name || 'User')
                                    )}
                                </div>
                                <div>
                                    <p className="font-semibold">
                                        Profile Picture
                                    </p>
                                    <p className="text-xs text-muted-foreground">
                                        Add an image URL below.
                                    </p>
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    placeholder="Enter your full name"
                                    maxLength={80}
                                    required
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition-colors focus:border-primary"
                                />
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Profile Image URL
                                </label>
                                <div className="relative">
                                    <ImagePlus
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground"
                                    />
                                    <input
                                        type="url"
                                        value={image}
                                        onChange={(e) =>
                                            setImage(e.target.value)
                                        }
                                        placeholder="https://example.com/image.jpg"
                                        className="w-full rounded-xl border border-border bg-background py-3 pl-11 pr-4 text-sm outline-none transition-colors focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-semibold">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={user.email}
                                    disabled
                                    className="w-full cursor-not-allowed rounded-xl border border-border bg-muted px-4 py-3 text-sm text-muted-foreground"
                                />
                                <p className="mt-2 text-xs text-muted-foreground">
                                    Email address cannot be changed here.
                                </p>
                            </div>

                            <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                                <button
                                    type="button"
                                    onClick={() => setIsEditOpen(false)}
                                    disabled={isSaving}
                                    className="rounded-xl border border-border px-5 py-3 text-sm font-semibold hover:bg-muted disabled:opacity-50"
                                >
                                    Cancel
                                </button>

                                <button
                                    type="submit"
                                    disabled={isSaving}
                                    className="inline-flex items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
                                >
                                    {isSaving && (
                                        <Loader2
                                            size={16}
                                            className="animate-spin"
                                        />
                                    )}
                                    {isSaving ? 'Saving...' : 'Save Changes'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </main>
    );
};

type EventSectionProps = {
    title: string;
    description: string;
    events: ProfileEvent[];
    loading: boolean;
    emptyText: string;
    emptyAction: string;
    emptyHref: string;
    viewAllHref: string;
};

const EventSection = ({
    title,
    description,
    events,
    loading,
    emptyText,
    emptyAction,
    emptyHref,
    viewAllHref,
}: EventSectionProps) => {
    return (
        <section className="space-y-5">
            <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                <div>
                    <h2 className="text-xl font-bold sm:text-2xl">{title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">
                        {description}
                    </p>
                </div>

                <Link
                    href={viewAllHref}
                    className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:underline"
                >
                    View all <ArrowRight size={16} />
                </Link>
            </div>

            {loading ? (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {[1, 2, 3].map((item) => (
                        <div
                            key={item}
                            className="h-64 animate-pulse rounded-2xl bg-muted"
                        />
                    ))}
                </div>
            ) : events.length === 0 ? (
                <div className="rounded-2xl border border-dashed border-border bg-card px-5 py-12 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-muted text-muted-foreground">
                        <CalendarDays size={25} />
                    </div>
                    <h3 className="mt-4 font-semibold">{emptyText}</h3>
                    <Link
                        href={emptyHref}
                        className="mt-4 inline-flex items-center gap-2 rounded-xl bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
                    >
                        <Plus size={16} />
                        {emptyAction}
                    </Link>
                </div>
            ) : (
                <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
                    {events.map((event) => (
                        <Link
                            href={`/upcoming-events/${event._id}`}
                            key={event._id}
                            className="group overflow-hidden rounded-2xl border border-border bg-card transition-all hover:-translate-y-1 hover:shadow-lg"
                        >
                            <div className="relative h-44 overflow-hidden bg-muted">
                                {event.imageUrl ? (
                                    <Image
                                        src={event.imageUrl}
                                        alt={event.title}
                                        fill
                                        unoptimized
                                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="flex h-full items-center justify-center text-muted-foreground">
                                        <ImagePlus size={32} />
                                    </div>
                                )}

                                <span className="absolute left-3 top-3 rounded-full bg-background/90 px-3 py-1 text-xs font-semibold backdrop-blur">
                                    {event.eventType}
                                </span>
                            </div>

                            <div className="p-5">
                                <h3 className="line-clamp-1 font-bold transition-colors group-hover:text-primary">
                                    {event.title}
                                </h3>

                                <p className="mt-2 line-clamp-2 text-sm text-muted-foreground">
                                    {event.description}
                                </p>

                                <div className="mt-4 space-y-2 border-t border-border pt-4">
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <CalendarDays
                                            size={15}
                                            className="shrink-0 text-primary"
                                        />
                                        {formatDate(event.eventDate)}
                                    </p>
                                    <p className="flex items-center gap-2 text-xs text-muted-foreground">
                                        <MapPin
                                            size={15}
                                            className="shrink-0 text-primary"
                                        />
                                        <span className="truncate">
                                            {event.location}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            )}
        </section>
    );
};

export default ProfilePage;
