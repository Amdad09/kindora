'use client';
import { useState } from 'react';
import { signIn } from '@/lib/auth-client';
import { toast } from 'sonner';
import GoogleAuthButton from '@/components/auth/GoogleAuthButton';
import Link from 'next/link';
import { Heart, ArrowRight } from 'lucide-react';
import { getSafeCallbackURL } from '@/lib/auth-redirect';


export default function LoginPage() {
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);

        const email = String(formData.get('email') ?? '').trim();
        const password = String(formData.get('password') ?? '');

        if (!email || !password) {
            toast.error('Please enter your email and password.');
            return;
        }

        try {
            setLoading(true);

            const { error } = await signIn.email({
                email,
                password,
                callbackURL: getSafeCallbackURL(),
            });

            if (error) {
                toast.error(error.message || 'Login failed.');
                return;
            }

            toast.success('Welcome back!', {
                description: 'You have successfully signed in.',
            });

        } catch (error) {
            console.error('Login error:', error);
            toast.error('Something went wrong. Please try again.');
        } finally {
            setLoading(false);
        }
    };
    return (
        <main className="flex min-h-[85vh] items-center justify-center px-4 py-12">
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
                            Welcome back to the community.
                        </h2>
                        <p className="mt-5 max-w-sm text-sm leading-7 opacity-85">
                            Every time you show up, you make a difference.
                            Continue your journey of creating positive change.
                        </p>
                    </div>

                    <p className="text-sm opacity-70">
                        Together, we can make the world better.
                    </p>

                    <div className="absolute -bottom-24 -right-20 h-72 w-72 rounded-full border-40 border-white/10" />
                    <div className="absolute -right-10 -top-20 h-56 w-56 rounded-full bg-white/10 blur-2xl" />
                </div>

                {/* Right: Login form */}
                <div className="flex flex-col justify-center p-6 sm:p-10 lg:p-12">
                    <div className="mb-8">
                        <Link
                            href="/"
                            className="mb-7 inline-flex items-center gap-2 text-xl font-bold text-primary md:hidden"
                        >
                            <Heart className="h-6 w-6 fill-current" />
                            Kindora.
                        </Link>

                        <h1 className="text-3xl font-bold tracking-tight text-foreground">
                            Welcome back
                        </h1>
                        <p className="mt-2 text-sm text-muted-foreground">
                            Sign in to continue your journey with Kindora.
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

                    <form onSubmit={handleLogin} className="space-y-5">
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
                                htmlFor="password"
                                className="text-sm font-medium"
                            >
                                Password
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Enter your password"
                                required
                                className="w-full rounded-xl border border-border bg-background px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="group flex w-full items-center justify-center gap-2 rounded-xl bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition hover:opacity-90"
                        >
                            {loading ? 'Signing in...' : 'Sign In'}
                            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </form>

                    <p className="mt-7 text-center text-sm text-muted-foreground">
                        Do not have an account?{' '}
                        <Link
                            href="/register"
                            className="font-semibold text-primary hover:underline"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </main>
    );
}
