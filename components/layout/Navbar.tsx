'use client';

import { Menu, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import AuthAction from '../auth/AuthAction';
import ThemeToggle from '../shared/ThemeToggle';
import { useSession } from '@/lib/auth-client';
import Logout from '../auth/Logout';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/upcoming-events', label: 'Upcoming Events' },
];

export const Logo = () => (
    <div className="flex items-center">
        <div className="relative flex h-10 w-10 items-center justify-center">
            <Image src="/logo.png" width={72} height={72} alt="Logo" />
        </div>

        <span className="text-2xl font-bold tracking-tight text-primary">
            Kindora<span className="text-brand-accent">.</span>
        </span>
    </div>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { data: session } = useSession();
    const pathname = usePathname();
    // const isHome = pathname === '/';

    const closeMenu = () => setIsOpen(false);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        let lastScrollY = window.scrollY;
        let hideTimer: ReturnType<typeof setTimeout> | undefined;

        const clearHideTimer = () => {
            if (hideTimer) {
                clearTimeout(hideTimer);
                hideTimer = undefined;
            }
        };

        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            const heroHeight = window.innerHeight;

            if (currentScrollY < heroHeight) {
                clearHideTimer();
                setIsVisible(true);
                lastScrollY = currentScrollY;
                return;
            }

            if (currentScrollY > lastScrollY + 5) {
                clearHideTimer();
                setIsVisible(false);
            } else if (currentScrollY < lastScrollY - 5) {
                setIsVisible(true);
                clearHideTimer();
                hideTimer = setTimeout(() => {
                    setIsVisible(false);
                }, 2000);
            }

            lastScrollY = currentScrollY;
        };

        window.addEventListener('scroll', handleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', handleScroll);
            clearHideTimer();
        };
    }, []);

    return (
        <header
            className={`fixed inset-x-0 top-5 z-50 transition-transform duration-300 ease-in-out ${
                isVisible ? 'translate-y-0' : 'translate-y-[-130%]'
            }`}
        >
            <nav className="relative mx-auto flex h-18 max-w-375 items-center justify-between rounded-3xl border border-border/70 bg-card/85 px-5 shadow-sm backdrop-blur-xl sm:px-8">
                {/* Logo */}
                <Link href="/" onClick={closeMenu} className="shrink-0">
                    <Logo />
                </Link>

                {/* Desktop Navigation */}
                <div className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-2 md:flex">
                    {navLinks.map((link) => {
                        const active = isActive(link.href);

                        return (
                            <Link
                                key={link.href}
                                href={link.href}
                                className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
                                    active
                                        ? 'text-primary'
                                        : 'text-muted-foreground hover:text-primary'
                                }`}
                            >
                                {link.label}
                            </Link>
                        );
                    })}
                </div>

                {/* Right Actions */}
                {/* Right Actions */}
                <div className="flex shrink-0 items-center gap-3">
                    <ThemeToggle />

                    <AuthAction />

                    {session && (
                        <div className="hidden md:block">
                            <Logout />
                        </div>
                    )}

                    {/* Mobile Menu Button */}
                    <button
                        type="button"
                        onClick={() => setIsOpen((prev) => !prev)}
                        aria-label={
                            isOpen
                                ? 'Close navigation menu'
                                : 'Open navigation menu'
                        }
                        aria-expanded={isOpen}
                        aria-controls="mobile-navigation"
                        className="rounded-xl p-2 text-foreground transition-colors hover:bg-muted md:hidden"
                    >
                        {isOpen ? <X size={24} /> : <Menu size={24} />}
                    </button>
                </div>
            </nav>

            {/* Mobile Navigation */}
            {isOpen && (
                <div
                    id="mobile-navigation"
                    className="absolute left-4 right-4 top-full z-50 mt-2 rounded-2xl border border-border bg-card p-4 shadow-xl sm:left-6 sm:right-6 md:hidden"
                >
                    <div className="flex flex-col gap-2">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={closeMenu}
                                className={`rounded-xl px-4 py-3 text-base font-medium transition-colors ${
                                    isActive(link.href)
                                        ? 'bg-primary/10 text-primary'
                                        : 'text-foreground hover:bg-muted'
                                }`}
                            >
                                {link.label}
                            </Link>
                        ))}

                        <AuthAction mobile onNavigate={closeMenu} />
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
