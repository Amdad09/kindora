'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState } from 'react';
import { useSession } from '@/lib/auth-client';
import { ChevronDown } from 'lucide-react';
import Logout from './Logout';

type AuthActionProps = {
    mobile?: boolean;
    onNavigate?: () => void;
};

const AuthAction = ({ mobile = false, onNavigate }: AuthActionProps) => {
    const { data: session, isPending } = useSession();
    const [isOpen, setIsOpen] = useState(false);
    

    const closeMenu = () => {
        setIsOpen(false);
        onNavigate?.();
    };

    

    if (isPending) {
        return (
            <div
                className={
                    mobile
                        ? 'mt-2 h-12 animate-pulse rounded-xl bg-muted'
                        : 'hidden h-10 w-28 animate-pulse rounded-full bg-muted md:block'
                }
            />
        );
    }

    if (!session) {
        return (
            <Link
                href="/login"
                onClick={onNavigate}
                className={
                    mobile
                        ? 'mt-2 block rounded-xl bg-primary px-5 py-3 text-center font-semibold text-primary-foreground'
                        : 'hidden rounded-full bg-primary px-7 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90 md:inline-flex'
                }
            >
                Log In
            </Link>
        );
    }

    const name = session.user.name || 'User';
    const image = session.user.image;

    const avatar = image ? (
        <Image
            src={image}
            alt={name}
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
        />
    ) : (
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary font-semibold text-primary-foreground">
            {name.charAt(0).toUpperCase()}
        </span>
    );

    const menuItems = [
        { href: '/profile', label: 'My Profile' },
        { href: '/create-event', label: 'Create Event' },
        { href: '/manage-events', label: 'Manage Events' },
        { href: '/joined-events', label: 'Joined Events' },
    ];

    return (
        <div className={mobile ? 'w-full' : 'relative hidden md:block'}>
            {/* User Trigger */}
            <button
                type="button"
                onClick={() => setIsOpen((prev) => !prev)}
                aria-expanded={isOpen}
                aria-label="Toggle user menu"
                className={
                    mobile
                        ? 'flex w-full items-center gap-3 rounded-xl border border-border p-3 text-left hover:bg-muted'
                        : 'flex items-center gap-2 rounded-full border border-border px-3 py-2 transition-colors hover:bg-muted'
                }
            >
                {avatar}

                <span className="flex-1 truncate text-sm font-semibold">
                    {name}
                </span>

                <ChevronDown
                    size={16}
                    className={`shrink-0 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            {/* Dropdown Menu */}
            {isOpen && (
                <div
                    className={
                        mobile
                            ? 'mt-2 space-y-1 rounded-xl border border-border bg-card p-2'
                            : 'absolute right-0 top-full z-50 mt-2 w-60 rounded-2xl border border-border bg-card p-2 shadow-xl'
                    }
                >
                    {/* User Information */}
                    <div className="border-b border-border px-3 py-3">
                        <p className="truncate text-sm font-semibold">{name}</p>
                        <p className="truncate text-xs text-muted-foreground">
                            {session.user.email}
                        </p>
                    </div>

                    {/* Navigation Links */}
                    <div className="space-y-1 pt-1">
                        {menuItems.map((item) => (
                            <Link
                                key={item.href}
                                href={item.href}
                                onClick={closeMenu}
                                className="block rounded-xl px-3 py-2.5 text-sm font-medium transition-colors hover:bg-muted"
                            >
                                {item.label}
                            </Link>
                        ))}
                    </div>

                    {/* Logout */}
                    <div className="border-t border-border pt-1">
                        <Logout/>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AuthAction;
