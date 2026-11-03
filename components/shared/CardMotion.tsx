'use client';

import type { ReactNode } from 'react';
import { motion } from 'framer-motion';

interface CardMotionProps {
    children: ReactNode;
    className?: string;
}

const CardMotion = ({ children, className = '' }: CardMotionProps) => {
    return (
        <motion.div
            className={`h-full min-w-0 w-full ${className}`}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{
                duration: 0.4,
                ease: 'easeOut',
            }}
        >
            {children}
        </motion.div>
    );
};

export default CardMotion;
