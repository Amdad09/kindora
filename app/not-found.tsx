import Link from 'next/link';
import {
    ArrowLeft,
    CalendarDays,
    Compass,
    HeartHandshake,
    SearchX,
} from 'lucide-react';


const NotFound = () => {
    return (
        <main className="relative flex min-h-screen items-center justify-center overflow-hidden px-5 py-16">
            {/* Background Decoration */}
            <div className="pointer-events-none absolute -left-32 -top-32 size-80 rounded-full bg-primary/5 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-32 -right-32 size-80 rounded-full bg-primary/10 blur-3xl" />

            <div className="relative mx-auto w-full max-w-xl text-center">
                {/* Icon */}
                <div className="relative mx-auto mb-8 flex size-24 items-center justify-center rounded-3xl border border-primary/15 bg-primary/5">
                    <SearchX className="size-11 text-primary" />

                    <span className="absolute -right-2 -top-2 flex size-8 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                        !
                    </span>
                </div>

                {/* Error Code */}
                <p className="text-8xl font-extrabold tracking-tighter text-primary/15 sm:text-9xl">
                    404
                </p>

                {/* Heading */}
                <div className="-mt-3">
                    <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
                        Oops! Page Not Found
                    </h1>

                    <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-muted-foreground sm:text-base">
                        The page you are looking for might have been removed,
                        had its name changed, or is temporarily unavailable.
                    </p>
                </div>

                {/* Message */}
                <div className="mx-auto mt-8 flex max-w-md items-start gap-3 rounded-xl border border-border bg-card p-4 text-left">
                    <HeartHandshake className="mt-0.5 size-5 shrink-0 text-primary" />

                    <p className="text-sm leading-6 text-muted-foreground">
                        Do not worry! There are still plenty of opportunities to
                        make a positive impact in your community.
                    </p>
                </div>

                {/* Actions */}
                <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/"
                        className="inline-flex items-center justify-center rounded-full bg-primary px-6 py-2.5 text-sm font-medium text-primary-foreground transition hover:bg-primary/90"
                    >
                        <ArrowLeft className="mr-2 size-4" />
                        Back to Home
                    </Link>

                    <Link
                        href="/upcoming-events"
                        className="inline-flex items-center justify-center rounded-full border border-input bg-background px-6 py-2.5 text-sm font-medium transition hover:bg-accent hover:text-accent-foreground"
                    >
                        <CalendarDays className="mr-2 size-4" />
                        Explore Events
                    </Link>
                </div>

                {/* Footer */}
                <div className="mt-12 flex items-center justify-center gap-2 text-xs text-muted-foreground">
                    <Compass className="size-4" />
                    <span>Keep exploring. Keep making a difference.</span>
                </div>
            </div>
        </main>
    );
};

export default NotFound;
