
import Link from 'next/link';
import { ArrowRight, CalendarDays, Heart, Leaf, Users } from 'lucide-react';
import HeroImage from './HeroImage';

const highlights = [
    { label: 'Community-led', icon: Users },
    { label: 'Meaningful events', icon: CalendarDays },
    { label: 'Positive impact', icon: Heart },
];

const features = [
    {
        title: 'Discover Events',
        description:
            'Find impactful events near you and be part of something bigger.',
        icon: CalendarDays,
        iconClass: 'bg-primary/15 text-primary',
        href: '/upcoming-events',
    },
    {
        title: 'Join Community',
        description:
            'Connect with like-minded people who care about positive change.',
        icon: Users,
        iconClass: 'bg-brand-accent/15 text-brand-accent',
        href: '/upcoming-events',
    },
    {
        title: 'Create Impact',
        description:
            'Organize meaningful events and inspire others to take action.',
        icon: Leaf,
        iconClass: 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400',
        href: '/create-event',
    },
];

const Hero = () => {
    return (
        <section className="relative isolate flex min-h-screen flex-col overflow-hidden">
            {/* Background Decorations */}
            <div className="pointer-events-none absolute -left-40 top-40 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
            <div className="pointer-events-none absolute right-0 top-0 -z-10 h-96 w-96 rounded-full bg-brand-accent/10 blur-3xl" />

            {/* Hero Main Area */}
            <div className="relative mx-auto grid w-full max-w-375 flex-1 items-center gap-10 px-4 pb-10 pt-32 sm:px-6 sm:pt-36 lg:grid-cols-2 lg:px-8 lg:pb-12 lg:pt-28">
                {/* Left Content */}
                <div className="relative z-10">
                    {/* Badge */}
                    <div className="mb-7 inline-flex items-center gap-2.5 rounded-full border border-primary/10 bg-primary/10 px-4 py-2.5 text-sm font-semibold text-primary">
                        <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
                        Community Impact Platform
                    </div>

                    {/* Heading */}
                    <h1 className="max-w-2xl text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl lg:text-7xl">
                        Small Acts.
                        <span className="mt-1 block text-primary">
                            Lasting Impact.
                        </span>
                    </h1>

                    {/* Description */}
                    <p className="mt-7 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                        Discover meaningful community events, connect with
                        people who care, and turn small acts of kindness into a
                        better tomorrow.
                    </p>

                    {/* CTA */}
                    <div className="mt-9 flex flex-col gap-3 sm:flex-row">
                        <Link
                            href="/upcoming-events"
                            className="group inline-flex items-center justify-center gap-3 rounded-full bg-primary px-7 py-4 font-semibold text-primary-foreground shadow-lg shadow-primary/15 transition-all hover:-translate-y-0.5 hover:shadow-xl"
                        >
                            Explore Events
                            <ArrowRight
                                size={19}
                                className="transition-transform group-hover:translate-x-1"
                            />
                        </Link>

                        <Link
                            href="/create-event"
                            className="inline-flex items-center justify-center gap-2.5 rounded-full border border-primary/40 bg-card/70 px-7 py-4 font-semibold text-foreground transition-colors hover:bg-primary/5"
                        >
                            <CalendarDays size={19} className="text-primary" />
                            Create an Event
                        </Link>
                    </div>

                    {/* Highlights */}
                    <div className="mt-11 flex flex-wrap items-center gap-x-6 gap-y-4">
                        {highlights.map((item, index) => {
                            const Icon = item.icon;

                            return (
                                <div
                                    key={item.label}
                                    className="flex items-center gap-2.5"
                                >
                                    {index > 0 && (
                                        <span className="mr-3 hidden h-8 w-px bg-border sm:block" />
                                    )}

                                    <Icon
                                        size={21}
                                        className="shrink-0 text-primary"
                                    />

                                    <span className="text-sm font-medium text-muted-foreground">
                                        {item.label}
                                    </span>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Right Hero Image */}
                <div className="relative min-h-90 w-full sm:min-h-120 lg:absolute lg:inset-y-0 lg:right-0 lg:h-full lg:w-[52%]">
                    <div className="absolute -right-8 top-20 h-48 w-48 rounded-full bg-brand-accent/20 blur-3xl" />

                    {/* Image Container */}
                    <div className="absolute inset-0 overflow-hidden lg:rounded-bl-[7rem]">
                        <HeroImage/>

                        {/* Soft Overlay */}
                        <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-background/15 via-transparent to-transparent" />
                    </div>

                    {/* Floating Caption */}
                    <div className="absolute bottom-5 left-4 right-4 z-10 rounded-2xl border border-border/70 bg-card/90 p-4 shadow-lg backdrop-blur-md sm:bottom-8 sm:left-8 sm:right-auto sm:max-w-xs">
                        <div className="flex items-center gap-3">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                                <Heart size={22} />
                            </div>

                            <div>
                                <p className="font-bold text-card-foreground">
                                    Every action matters.
                                </p>
                                <p className="mt-0.5 text-sm text-muted-foreground">
                                    Be part of positive change.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Feature Cards */}
            <div className="relative z-20 mx-auto grid w-full max-w-350 gap-4 px-4 pb-8 sm:px-6 md:grid-cols-2 lg:grid-cols-3 lg:px-8">
                {features.map((feature) => {
                    const Icon = feature.icon;

                    return (
                        <Link
                            key={feature.title}
                            href={feature.href}
                            className="group flex items-center gap-4 rounded-3xl border border-border/80 bg-card/95 p-5 shadow-lg shadow-foreground/5 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl sm:gap-5 sm:p-6"
                        >
                            <div
                                className={`flex h-16 w-16 shrink-0 items-center justify-center rounded-full ${feature.iconClass}`}
                            >
                                <Icon size={28} />
                            </div>

                            <div className="min-w-0 flex-1">
                                <h3 className="text-lg font-bold text-foreground">
                                    {feature.title}
                                </h3>

                                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                                    {feature.description}
                                </p>
                            </div>

                            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-foreground transition-all group-hover:border-primary group-hover:bg-primary group-hover:text-primary-foreground">
                                <ArrowRight
                                    size={18}
                                    className="transition-transform group-hover:translate-x-0.5"
                                />
                            </div>
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default Hero;
