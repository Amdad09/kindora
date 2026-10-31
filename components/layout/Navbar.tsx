'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';
import ThemeToggle from '../shared/ThemeToggle';
import Image from 'next/image';

const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/upcoming-events', label: 'Upcoming Events' },
];

export const Logo = () => (
    <div className="flex items-center">
        <div className="relative flex h-10 w-10 items-center justify-center">
            <Image src='/logo.png' width={72} height={72} alt='Logo'/>
        </div>

        <span className="text-2xl font-bold tracking-tight text-primary">
            Kindora<span className="text-brand-accent">.</span>
        </span>
    </div>
);

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const pathname = usePathname();

    const isHome = pathname === '/';

    const closeMenu = () => setIsOpen(false);

    const isActive = (href: string) =>
        href === '/' ? pathname === '/' : pathname.startsWith(href);

    return (
        <header
            className={`z-50 w-full px-4 pt-4 sm:px-6 lg:px-8 ${
                isHome ? 'absolute left-0 top-0' : 'sticky top-0'
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
                <div className="flex items-center gap-3">
                    <ThemeToggle />

                    <Link
                        href="/login"
                        className="hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex"
                    >
                        Login
                    </Link>

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

                        <Link
                            href="/login"
                            onClick={closeMenu}
                            className="mt-2 rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground"
                        >
                            Login
                        </Link>
                    </div>
                </div>
            )}
        </header>
    );
};

export default Navbar;
