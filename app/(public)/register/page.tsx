'use client';
import { useState } from 'react';
import { signUp } from '@/lib/auth-client';
import { toast } from 'sonner';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';

import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
// import { getSafeCallbackURL } from '@/lib/auth-redirect';
import { useRouter } from 'next/navigation';

const default_image =
    'https://images.unsplash.com/photo-1559027615-cd4628902d4a?auto=format&fit=crop&w=1200&q=85';

export default function RegisterPage() {
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const name = String(formData.get('name') ?? '').trim();
        const email = String(formData.get('email') ?? '').trim();
        const image = String(formData.get('image') ?? '').trim() || default_image;
        const password = String(formData.get('password') ?? '');

        if (password.length < 6) {
            toast.error('Password must be at least 6 characters');
            return;
        }

        if (!/[A-Z]/.test(password)) {
            toast.error('Password must contain an uppercase letter');
            return;
        }

        if (!/[a-z]/.test(password)) {
            toast.error('Password must contain a lowercase letter');
            return;
        }

        try {
            setLoading(true);

            const { error } = await signUp.email({
                name,
                email,
                password,
                image: image || undefined,
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'Registration failed');
                return;
            }

            toast.success('Account created successfully!');

            router.replace('/');
            router.refresh();
        } catch (error) {
            console.error('Registration error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex min-h-[85vh] mt-20 items-center justify-center px-4 py-12">
            <div className="grid w-full max-w-5xl overflow-hidden rounded-3xl border border-border bg-card shadow-xl md:grid-cols-2">
                {/* Left: Brand panel */}
                <div className="relative hidden flex-col justify-between overflow-hidden bg-primary p-10 text-primary-foreground md:flex">
                    <div>
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2 text-2xl font-bold"
                        >
                            <Heart className="h-7 w-7 fill-current" />
                            Kindora.
                        </Link>
                    </div>

                    <div className="relative z-10">
                        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] opacity-80">
                            Small Acts. Lasting Impact.
                        </p>
                        <h2 className="text-4xl font-bold leading-tight">
                            Be part of something bigger than yourself.
                        </h2>
                        <p className="mt-5 max-w-sm text-sm leading-7 opacity-85">
                            Connect with your community, discover meaningful
                            events, and create positive change together.
                        </p>
                    </div>

                    <p className="text-sm opacity-70">
                        Make every act of kindness count.
                    </p>

                    <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-40 border-white/10" />
                    <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                </div>

                {/* Right: Register form */}
                <div className="p-6 sm:p-10 lg:p-12">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="mb-7 inline-flex items-center gap-2 text-xl font-bold text-primary md:hidden"
                        >
                            <Heart className="h-6 w-6 fill-current" />
                            Kindora.
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Create an account
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Join our community and start making a difference.
                        </p>
                    </div>

                    <GoogleAuthButton />

                    <div className="my-6 flex items-center gap-4">
                        <div className="h-px flex-1 bg-border" />
                        <span className="text-xs text-muted-foreground">
                            OR CONTINUE WITH EMAIL
                        </span>
                        <div className="h-px flex-1 bg-border" />
                    </div>

                    <form onSubmit={handleRegister} className="space-y-4">
                        <div className="space-y-2">
                            <label
                                htmlFor="name"
                                className="text-sm font-medium"
                            >
                                Full Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="email"
                                className="text-sm font-medium"
                            >
                                Email Address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="you@example.com"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="image"
                                className="text-sm font-medium"
                            >
                                Profile Photo URL{' '}
                                {/* <span className="text-muted-foreground">
                                    (Optional)
                                </span> */}
                            </label>
                            <input
                                id="image"
                                name="image"
                                type="url"
                                required
                                placeholder="https://images.unsplash.com/photo-event"
                                defaultValue={default_image}
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <div className="space-y-2">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Create a strong password"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                            <p className="text-xs text-muted-foreground">
                                At least 6 characters, with uppercase and
                                lowercase letters.
                            </p>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {loading ? 'Creating Account...' : 'Create Account'}
                            {!loading && (
                                <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                            )}
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-muted-foreground">
                        Already have an account?{' '}
                        <Link
                            href="/login"
                            className="font-semibold text-primary hover:underline"
                        >
                            Log In
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
