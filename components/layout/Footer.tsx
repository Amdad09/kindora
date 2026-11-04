import Link from 'next/link';
import {
    Heart,
    ArrowUpRight,
} from 'lucide-react';
import { FaFacebook, FaGithub, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { CurrentYear } from '../shared/CurrentYear';
import { Logo } from './Navbar';

const quickLinks = [
    { label: 'Home', href: '/' },
    { label: 'Upcoming Events', href: '/upcoming-events' },
    { label: 'Create an Event', href: '/create-event' },
];

const communityLinks = [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Privacy Policy', href: '/privacy' },
];

const socialLinks = [
    {
        icon: FaFacebook,
        href: 'https://www.facebook.com/Amdad09',
        label: 'Facebook',
    },
    {
        icon: FaYoutube,
        href: 'https://www.youtube.com/@amdadul_09',
        label: 'Youtube',
    },
    {
        icon: FaLinkedin,
        href: 'https://www.linkedin.com/in/Amdad09',
        label: 'LinkedIn',
    },
    { icon: FaGithub, href: 'https://github.com/Amdad09', label: 'GitHub' },
];

const Footer = () => {
    return (
        <footer className="border-t border-border bg-card">
            <div className="mx-auto max-w-350 px-4 pb-8 pt-16 sm:px-6 lg:px-8">
                {/* Main Footer */}
                <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-4">
                    {/* Brand */}
                    <div className="lg:col-span-2">
                        <Link
                            href="/"
                            className="inline-flex items-center gap-2"
                        >
                            <Logo/>
                        </Link>

                        <p className="mt-5 max-w-md leading-7 text-muted-foreground">
                            Small Acts. Lasting Impact. Join a community of
                            people who believe that even the smallest act of
                            kindness can create meaningful change.
                        </p>

                        {/* Social Links */}
                        <div className="mt-7 flex items-center gap-3">
                            {socialLinks.map(({ icon: Icon, href, label }) => (
                                <a
                                    key={label}
                                    href={href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={label}
                                    className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted-foreground transition-all hover:border-primary hover:bg-primary hover:text-primary-foreground"
                                >
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-semibold text-foreground">
                            Quick Links
                        </h3>

                        <ul className="mt-5 space-y-4">
                            {quickLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Community */}
                    <div>
                        <h3 className="font-semibold text-foreground">
                            Community
                        </h3>

                        <ul className="mt-5 space-y-4">
                            {communityLinks.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        href={link.href}
                                        className="inline-flex items-center gap-1 text-sm text-muted-foreground transition-colors hover:text-primary"
                                    >
                                        {link.label}
                                        <ArrowUpRight size={13} />
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                {/* Bottom Footer */}
                <div className="mt-14 flex flex-col items-center justify-between gap-4 border-t border-border pt-7 text-center sm:flex-row sm:text-left">
                    <p className="text-sm text-muted-foreground">
                        © <CurrentYear/> Kindora. All rights
                        reserved.
                    </p>

                    <p className="flex items-center gap-1 text-sm text-muted-foreground">
                        Made with
                        <Heart
                            size={14}
                            className="fill-brand-accent text-brand-accent"
                        />
                        for a better community.
                    </p>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
