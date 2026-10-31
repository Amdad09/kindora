/* eslint-disable react-hooks/set-state-in-effect */
'use client';

import Image from 'next/image';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

const HeroImage = () => {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return <div className="absolute inset-0 bg-muted animate-pulse" />;
    }

    const image =
        resolvedTheme === 'dark' ? '/hero-dark.png' : '/hero-volunteers.png';

    return (
        <Image
            src={image}
            alt="Community volunteers planting a tree together"
            fill
            priority
            sizes="(min-width: 1024px) 52vw, 100vw"
            className="object-contain object-center"
        />
    );
};

export default HeroImage;
