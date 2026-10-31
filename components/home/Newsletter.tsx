'use client';

import { useState } from 'react';
import { ArrowRight, Mail, Sparkles } from 'lucide-react';
import { toast } from 'sonner';

const Newsletter = () => {
    const [email, setEmail] = useState('');

    const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!email.trim()) {
            toast.error('Please enter your email address.');
            return;
        }

        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            toast.error('Please enter a valid email address.');
            return;
        }

        toast.success('Thank you for joining our community!');
        setEmail('');
    };

    return (
        <section className="bg-background px-4 py-20 sm:px-6 lg:px-8">
            <div className="relative mx-auto max-w-350 overflow-hidden rounded-[2rem] bg-primary px-6 py-16 text-primary-foreground sm:px-12 lg:px-20">
                {/* Decorative Elements */}
                <div className="pointer-events-none absolute -right-20 -top-24 h-72 w-72 rounded-full border-40 border-white/10" />
                <div className="pointer-events-none absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-40 border-white/10" />

                <div className="relative z-10 mx-auto max-w-3xl text-center">
                    <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-white/15">
                        <Mail size={26} />
                    </div>

                    <span className="inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/80">
                        <Sparkles size={16} />
                        Stay Connected
                    </span>

                    <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
                        Be the First to Make a Difference.
                    </h2>

                    <p className="mx-auto mt-5 max-w-xl leading-7 text-white/80">
                        Get updates about upcoming events, inspiring stories,
                        and new opportunities to create positive change.
                    </p>

                    <form
                        onSubmit={handleSubscribe}
                        className="mx-auto mt-9 flex max-w-xl flex-col gap-3 rounded-2xl bg-white p-2 sm:flex-row sm:rounded-full"
                    >
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email address"
                            aria-label="Email address"
                            className="min-w-0 flex-1 rounded-full px-5 py-3 text-sm text-stone-900 outline-none placeholder:text-stone-400"
                        />

                        <button
                            type="submit"
                            className="inline-flex items-center justify-center gap-2 rounded-full bg-stone-900 px-7 py-3 font-semibold text-white transition-colors hover:bg-stone-700"
                        >
                            Subscribe
                            <ArrowRight size={17} />
                        </button>
                    </form>

                    <p className="mt-4 text-xs text-white/70">
                        No spam. Just meaningful updates from our community.
                    </p>
                </div>
            </div>
        </section>
    );
};

export default Newsletter;
