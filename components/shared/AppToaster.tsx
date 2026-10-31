'use client';

import { Toaster } from 'sonner';
import { useTheme } from 'next-themes';

const AppToaster = () => {
    const { resolvedTheme } = useTheme();

    return (
        <Toaster
            position="top-center"
            theme={resolvedTheme === 'dark' ? 'dark' : 'light'}
            richColors
            closeButton
            duration={4000}
            visibleToasts={3}
            expand={false}
            toastOptions={{
                classNames: {
                    toast: 'rounded-xl border shadow-lg backdrop-blur-xl',
                    title: 'text-sm font-semibold',
                    description: 'text-xs opacity-80',
                    actionButton: 'bg-primary text-primary-foreground',
                    cancelButton: 'bg-muted text-muted-foreground',
                },
            }}
        />
    );
};

export default AppToaster;
