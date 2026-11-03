import { HeartHandshake, LoaderCircle } from 'lucide-react';

const Loading = () => {
    return (
        <main className="flex mt-20 min-h-[70vh] items-center justify-center px-5 py-16">
            <div className="flex flex-col items-center text-center">
                {/* Logo Icon */}
                <div className="flex size-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                    <HeartHandshake size={34} />
                </div>

                {/* Brand */}
                <h2 className="mt-5 text-2xl font-bold tracking-tight">
                    Kindora
                </h2>

                <p className="mt-2 text-sm text-muted-foreground">
                    Bringing people together for a better tomorrow.
                </p>

                {/* Loading Indicator */}
                <div className="mt-8 flex items-center gap-3">
                    <LoaderCircle className="size-5 animate-spin text-primary" />

                    <span className="text-sm font-medium text-muted-foreground">
                        Loading, please wait...
                    </span>
                </div>

                {/* Skeleton */}
                <div className="mt-10 w-full max-w-sm space-y-3">
                    <div className="h-3 w-full animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-4/5 animate-pulse rounded-full bg-muted" />
                    <div className="h-3 w-3/5 animate-pulse rounded-full bg-muted" />
                </div>
            </div>
        </main>
    );
};

export default Loading;
