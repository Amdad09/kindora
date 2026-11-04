'use client';

import { useState, type FormEvent } from 'react';
import {
    Mail,
    MapPin,
    MessageCircle,
    Send,
    Clock,
    ArrowRight,
} from 'lucide-react';
import { toast } from 'sonner';
import Link from 'next/link';

export default function ContactPages() {
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        setIsSubmitting(true);
        toast.info('Contact form submission is not connected yet.');
        setIsSubmitting(false);
    };

    return (
        <main className="bg-background text-foreground mt-20">
            {/* Hero */}
            <section className="border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 text-center sm:px-6 lg:px-8 lg:py-20">
                    <span className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
                        <MessageCircle size={16} />
                        Get in Touch
                    </span>

                    <h1 className="mt-6 text-4xl font-bold tracking-tight sm:text-5xl">
                        Let&apos;s Start a{' '}
                        <span className="text-primary">Conversation.</span>
                    </h1>

                    <p className="mx-auto mt-5 max-w-2xl leading-8 text-muted-foreground">
                        Have a question, an idea, or feedback? We would love to
                        hear from you. Reach out and let&apos;s make something
                        meaningful together.
                    </p>
                </div>
            </section>

            {/* Contact Content */}
            <section className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-[0.8fr_1.2fr] lg:px-8 lg:py-20">
                {/* Contact Information */}
                <div>
                    <p className="font-semibold text-primary">
                        CONTACT INFORMATION
                    </p>
                    <h2 className="mt-3 text-3xl font-bold">
                        We&apos;re Here to Help.
                    </h2>
                    <p className="mt-4 leading-8 text-muted-foreground">
                        Whether you need help using Kindora or want to share an
                        idea, this is a good place to start.
                    </p>

                    <div className="mt-9 space-y-5">
                        <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Mail size={21} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Email</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    For general questions and support.
                                </p>
                                <p className="mt-2 text-sm font-medium text-primary">
                                    Contact email coming soon
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <MapPin size={21} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Location</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    A community platform built to connect
                                    people.
                                </p>
                            </div>
                        </div>

                        <div className="flex gap-4 rounded-2xl border border-border bg-card p-5">
                            <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                <Clock size={21} />
                            </div>
                            <div>
                                <h3 className="font-semibold">Support</h3>
                                <p className="mt-1 text-sm text-muted-foreground">
                                    We aim to make your experience simple and
                                    welcoming.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Contact Form */}
                <div className="rounded-3xl border border-border bg-card p-6 shadow-sm sm:p-9">
                    <div>
                        <h2 className="text-2xl font-bold">
                            Send Us a Message
                        </h2>
                        <p className="mt-2 text-sm leading-7 text-muted-foreground">
                            Fill out the form below and tell us how we can help.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                        <div className="grid gap-5 sm:grid-cols-2">
                            <div>
                                <label
                                    htmlFor="name"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Your Name
                                </label>
                                <input
                                    id="name"
                                    name="name"
                                    type="text"
                                    required
                                    minLength={2}
                                    maxLength={80}
                                    placeholder="Enter your name"
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="mb-2 block text-sm font-medium"
                                >
                                    Email Address
                                </label>
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    maxLength={254}
                                    placeholder="you@example.com"
                                    className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                                />
                            </div>
                        </div>

                        <div>
                            <label
                                htmlFor="subject"
                                className="mb-2 block text-sm font-medium"
                            >
                                Subject
                            </label>
                            <input
                                id="subject"
                                name="subject"
                                type="text"
                                required
                                minLength={3}
                                maxLength={120}
                                placeholder="What is this about?"
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div>
                            <label
                                htmlFor="message"
                                className="mb-2 block text-sm font-medium"
                            >
                                Your Message
                            </label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                minLength={10}
                                maxLength={2000}
                                rows={6}
                                placeholder="Write your message here..."
                                className="w-full resize-y rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-6 py-3.5 font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
                        >
                            {isSubmitting ? 'Please wait...' : 'Send Message'}
                            <Send size={17} />
                        </button>
                    </form>

                    <p className="mt-5 text-xs leading-6 text-muted-foreground">
                        This is currently a frontend form preview. Messages are
                        not stored or sent anywhere yet.
                    </p>
                </div>
            </section>

            {/* Bottom CTA */}
            <section className="border-t border-border bg-muted/30 px-4 py-14 text-center">
                <h2 className="text-2xl font-bold">
                    Want to make a difference?
                </h2>
                <p className="mt-3 text-muted-foreground">
                    Explore upcoming events and find your next opportunity to
                    help.
                </p>

                <Link
                    href="/upcoming-events"
                    className="mt-6 inline-flex items-center gap-2 font-semibold text-primary hover:gap-3"
                >
                    Explore Events <ArrowRight size={17} />
                </Link>
            </section>
        </main>
    );
}
