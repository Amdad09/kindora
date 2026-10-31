import Image from 'next/image';
import { ArrowUpRight } from 'lucide-react';

const galleryImages = [
    {
        id: 1,
        title: 'Growing a Greener Future',
        category: 'Environment',
        image: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e',
        className: 'md:col-span-2 md:row-span-2',
    },
    {
        id: 2,
        title: 'Helping Hands',
        category: 'Community',
        image: 'https://images.unsplash.com/photo-1559027615-cd4628902d4a',
        className: '',
    },
    {
        id: 3,
        title: 'Sharing Kindness',
        category: 'Charity',
        image: 'https://images.unsplash.com/photo-1469571486292-0ba58a3f068b',
        className: '',
    },
    {
        id: 4,
        title: 'Building Better Communities',
        category: 'Education',
        image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7',
        className: '',
    },
    {
        id: 5,
        title: 'Together We Can',
        category: 'Volunteering',
        image: 'https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8',
        className: '',
    },
];

const Gallery = () => {
    return (
        <section className="bg-background py-20 sm:py-24">
            <div className="mx-auto max-w-350 px-4 sm:px-6 lg:px-8">
                {/* Section Heading */}
                <div className="mb-12 flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
                    <div className="max-w-xl">
                        <span className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">
                            Our Community
                        </span>

                        <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
                            Moments That{' '}
                            <span className="text-primary">Matter.</span>
                        </h2>

                        <p className="mt-4 leading-7 text-muted-foreground">
                            Every picture tells a story of kindness, teamwork,
                            and positive change. Explore the moments that make
                            our community special.
                        </p>
                    </div>

                    <a
                        href="/upcoming-events"
                        className="inline-flex w-fit items-center gap-2 font-semibold text-primary transition-colors hover:text-brand-accent"
                    >
                        Explore Events
                        <ArrowUpRight size={18} />
                    </a>
                </div>

                {/* Gallery Grid */}
                <div className="grid auto-rows-55 grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 md:auto-rows-60">
                    {galleryImages.map((item) => (
                        <div
                            key={item.id}
                            className={`group relative overflow-hidden rounded-2xl border border-border bg-card ${item.className}`}
                        >
                            <Image
                                src={item.image}
                                alt={item.title}
                                fill
                                sizes="(min-width: 768px) 33vw, 100vw"
                                className="object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            {/* Image Overlay */}
                            <div className="absolute inset-0 bg-linear-to-t from-black/75 via-black/10 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-100" />

                            {/* Image Information */}
                            <div className="absolute inset-x-0 bottom-0 p-5">
                                <span className="text-xs font-semibold uppercase tracking-wider text-amber-300">
                                    {item.category}
                                </span>

                                <h3 className="mt-2 text-lg font-semibold text-white">
                                    {item.title}
                                </h3>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Gallery;
