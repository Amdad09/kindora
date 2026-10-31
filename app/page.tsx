import Gallery from '@/components/home/Gallery';
import Hero from '@/components/home/Hero';
import Newsletter from '@/components/home/Newsletter';
import RecentEvents from '@/components/home/RecentEvents';
import { Suspense } from 'react';

export default function Home() {
    return (
        <main className="flex-1">
            <Hero />
            <Suspense
                fallback={
                    <p className="py-20 text-center">Loading events...</p>
                }
            >
                <RecentEvents />
                <Gallery />
                <Newsletter />
            </Suspense>
        </main>
    );
}
