import Navbar from '@/components/layout/Navbar';
import ThemeProvider from '@/components/providers/ThemeProvider';
import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import Footer from '@/components/layout/Footer';
import AppToaster from '@/components/shared/AppToaster';
import { Suspense } from 'react';

const geistSans = Geist({
    variable: '--font-geist-sans',
    subsets: ['latin'],
});

const geistMono = Geist_Mono({
    variable: '--font-geist-mono',
    subsets: ['latin'],
});

export const metadata: Metadata = {
    metadataBase: new URL('https://kindora-six.vercel.app'),
    title: {
        default: 'Kindora | Make a Difference Together',
        template: '%s | Kindora',
    },
    description:
        'Kindora connects people with meaningful community events, volunteer opportunities, and social development initiatives.',
    openGraph: {
        siteName: 'Kindora',
        type: 'website',
        locale: 'en_US',
    },
};

export default function RootLayout({ children }: LayoutProps<'/'>) {
    return (
        <html
            lang="en"
            suppressHydrationWarning
            className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">
                <ThemeProvider
                    attribute="class"
                    defaultTheme="dark"
                    enableSystem={false}
                    disableTransitionOnChange
                >
                    <Suspense fallback={null}>
                        <Navbar />
                    </Suspense>
                    {children}
                    <Footer />
                    <AppToaster />
                </ThemeProvider>
            </body>
        </html>
    );
}
