import Link from 'next/link';
import {
    ArrowRight,
    HeartHandshake,
    Leaf,
    Target,
    Users,
    GraduationCap,
    HandHeart,
    ShieldCheck,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'About | Kindora',
    description:
        "Learn about Kindora's mission, vision, and commitment to meaningful community impact.",
};

const values = [
    {
        icon: HeartHandshake,
        title: 'Compassion First',
        description:
            'We believe meaningful change begins with empathy, kindness, and a willingness to help others.',
    },
    {
        icon: Users,
        title: 'Stronger Together',
        description:
            'Real community impact happens when people come together and work toward a shared purpose.',
    },
    {
        icon: ShieldCheck,
        title: 'Trust & Transparency',
        description:
            'We value honest communication, responsible participation, and a welcoming environment.',
    },
    {
        icon: Leaf,
        title: 'Lasting Impact',
        description:
            'Small actions can create meaningful progress for people, communities, and the environment.',
    },
];

const focusAreas = [
    {
        icon: Leaf,
        title: 'Environment',
        description:
            'Protect nature and make our surroundings cleaner and greener.',
    },
    {
        icon: HandHeart,
        title: 'Charity',
        description: 'Support people and families who need a helping hand.',
    },
    {
        icon: GraduationCap,
        title: 'Education',
        description:
            'Help create opportunities for learning and personal growth.',
    },
    {
        icon: HeartHandshake,
        title: 'Community',
        description:
            'Build stronger connections through meaningful local activities.',
    },
];

export default function AboutPage() {
    return (
        <main className="bg-background text-foreground">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border">
                <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8 lg:py-28">
                    <div>
                        <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                            <HeartHandshake size={16} />
                            About Kindora
                        </span>

                        <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
                            Small Acts.
                            <span className="block text-primary">
                                Lasting Impact.
                            </span>
                        </h1>

                        <p className="mt-6 max-w-xl text-base leading-8 text-muted-foreground sm:text-lg">
                            Kindora is a community-driven platform that brings
                            people together through volunteering, social
                            initiatives, and meaningful events. We make it
                            easier to discover opportunities and take part in
                            positive change.
                        </p>

                        <Link
                            href="/upcoming-events"
                            className="mt-8 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                        >
                            Explore Events
                            <ArrowRight size={18} />
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="absolute -left-5 -top-5 h-32 w-32 rounded-full bg-primary/10 blur-2xl" />
                        <div className="absolute -bottom-5 -right-5 h-32 w-32 rounded-full bg-accent/20 blur-2xl" />

                        <img
                            src="https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85"
                            alt="Volunteers working together in a community"
                            className="relative aspect-[5/4] w-full rounded-3xl object-cover shadow-xl"
                        />
                    </div>
                </div>
            </section>

            {/* Mission and Vision */}
            <section className="mx-auto grid max-w-7xl gap-6 px-4 py-20 sm:px-6 md:grid-cols-2 lg:px-8">
                <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                        <Target size={24} />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">Our Mission</h2>
                    <p className="mt-4 leading-8 text-muted-foreground">
                        Our mission is to connect people with opportunities to
                        serve, contribute, and make a positive difference. We
                        want to make community participation more accessible and
                        meaningful.
                    </p>
                </div>

                <div className="rounded-3xl border border-border bg-card p-8 sm:p-10">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 text-accent-foreground">
                        <HeartHandshake size={24} />
                    </div>
                    <h2 className="mt-6 text-2xl font-bold">Our Vision</h2>
                    <p className="mt-4 leading-8 text-muted-foreground">
                        We envision communities where people feel inspired and
                        empowered to help one another, where every individual
                        can find an opportunity to contribute to something
                        bigger.
                    </p>
                </div>
            </section>

            {/* Values */}
            <section className="bg-muted/40 py-20">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="mx-auto max-w-2xl text-center">
                        <p className="font-semibold text-primary">
                            WHAT GUIDES US
                        </p>
                        <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                            The Values Behind Kindora
                        </h2>
                        <p className="mt-4 leading-7 text-muted-foreground">
                            These principles shape how we build our platform and
                            bring people together.
                        </p>
                    </div>

                    <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                        {values.map(({ icon: Icon, title, description }) => (
                            <div
                                key={title}
                                className="rounded-2xl border border-border bg-card p-6 transition-transform hover:-translate-y-1"
                            >
                                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={23} />
                                </div>
                                <h3 className="mt-5 text-lg font-bold">
                                    {title}
                                </h3>
                                <p className="mt-3 text-sm leading-7 text-muted-foreground">
                                    {description}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Focus Areas */}
            <section className="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
                <div className="text-center">
                    <p className="font-semibold text-primary">WHERE WE FOCUS</p>
                    <h2 className="mt-3 text-3xl font-bold sm:text-4xl">
                        Make a Difference in Many Ways
                    </h2>
                </div>

                <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
                    {focusAreas.map(({ icon: Icon, title, description }) => (
                        <div
                            key={title}
                            className="rounded-2xl border border-border bg-card p-6"
                        >
                            <Icon className="text-primary" size={28} />
                            <h3 className="mt-4 font-bold">{title}</h3>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                {description}
                            </p>
                        </div>
                    ))}
                </div>
            </section>

            {/* CTA */}
            <section className="px-4 pb-20 sm:px-6 lg:px-8">
                <div className="mx-auto max-w-7xl overflow-hidden rounded-3xl bg-primary px-6 py-14 text-center text-primary-foreground sm:px-12">
                    <h2 className="text-3xl font-bold sm:text-4xl">
                        Your Next Small Act Starts Here.
                    </h2>
                    <p className="mx-auto mt-4 max-w-2xl leading-7 opacity-90">
                        Discover an event, meet people who care, and become part
                        of something meaningful.
                    </p>
                    <Link
                        href="/upcoming-events"
                        className="mt-8 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105"
                    >
                        Find an Event <ArrowRight size={18} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
