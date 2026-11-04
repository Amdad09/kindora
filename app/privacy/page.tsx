import Link from 'next/link';
import {
    ShieldCheck,
    UserRound,
    Database,
    LockKeyhole,
    Cookie,
    Eye,
    Mail,
    ArrowRight,
} from 'lucide-react';
import type { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Privacy Policy | Kindora',
    description:
        'Learn how Kindora handles information and supports user privacy.',
};

const privacySections = [
    {
        icon: UserRound,
        title: '1. Information We Collect',
        content: [
            'When you create an account, the platform may collect information such as your name, email address, and profile image.',
            'When you create or join an event, information related to that activity may be stored, such as event details and participation records.',
            'Information provided voluntarily through platform forms may also be collected when those features are connected.',
        ],
    },
    {
        icon: Database,
        title: '2. How We Use Information',
        content: [
            'To create and manage your account.',
            'To display events and provide event participation features.',
            'To help you manage events you create and view events you have joined.',
            'To maintain and improve the platform experience.',
        ],
    },
    {
        icon: LockKeyhole,
        title: '3. Authentication and Security',
        content: [
            'Kindora uses an authentication system to support account registration and login.',
            'We aim to protect account and platform information through appropriate technical and organizational measures.',
            'No online service can guarantee absolute security. Users should keep their login credentials private.',
        ],
    },
    {
        icon: Eye,
        title: '4. Information Sharing',
        content: [
            'We do not intend to sell personal information.',
            'Some information may be visible to other users when it is necessary for platform features, such as event details or participation information.',
            'Information may be processed by third-party services that are used to operate platform features, subject to their own privacy policies.',
        ],
    },
    {
        icon: Cookie,
        title: '5. Cookies and Similar Technologies',
        content: [
            'Authentication and platform functionality may use cookies or similar technologies.',
            'These technologies help the platform maintain functionality and remember relevant session information.',
        ],
    },
    {
        icon: UserRound,
        title: '6. Your Choices',
        content: [
            'Keep your account information accurate and up to date.',
            'Avoid sharing sensitive personal information in public event descriptions.',
            'Contact the platform team if you have questions about your information or want to request a change.',
        ],
    },
    {
        icon: ShieldCheck,
        title: '7. Policy Updates',
        content: [
            'This policy may be updated as Kindora develops new features or changes how information is handled.',
            'Any updated version should be published on this page with its revised effective date.',
        ],
    },
];

export default function PrivacyPage() {
    return (
        <main className="bg-background text-foreground pt-10">
            {/* Hero */}
            <section className="relative overflow-hidden border-b border-border bg-muted/30">
                <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
                    <div className="mx-auto max-w-3xl text-center">
                        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                            <ShieldCheck size={32} />
                        </div>

                        <p className="mt-6 font-semibold text-primary">
                            YOUR PRIVACY MATTERS
                        </p>

                        <h1 className="mt-3 text-4xl font-bold tracking-tight sm:text-5xl">
                            Privacy <span className="text-primary">Policy</span>
                        </h1>

                        <p className="mt-5 text-base leading-8 text-muted-foreground sm:text-lg">
                            We believe trust is an important part of every
                            community. This page explains the information
                            Kindora may handle and how it relates to the
                            platform experience.
                        </p>

                        <p className="mt-6 text-sm text-muted-foreground">
                            Draft policy · Review before production launch
                        </p>
                    </div>
                </div>
            </section>

            {/* Privacy Introduction */}
            <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8">
                <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6 sm:p-8">
                    <div className="flex items-start gap-4">
                        <ShieldCheck
                            className="mt-1 shrink-0 text-primary"
                            size={25}
                        />
                        <div>
                            <h2 className="text-lg font-bold">
                                Our Privacy Commitment
                            </h2>
                            <p className="mt-2 text-sm leading-7 text-muted-foreground">
                                Kindora is designed to help people discover and
                                participate in community events. We aim to
                                handle information responsibly and explain how
                                it is used. The details below should be
                                finalized to reflect the platform&apos;s actual
                                implementation.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Policy Sections */}
            <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6 lg:px-8">
                <div className="space-y-5">
                    {privacySections.map(({ icon: Icon, title, content }) => (
                        <article
                            key={title}
                            className="rounded-2xl border border-border bg-card p-6 sm:p-8"
                        >
                            <div className="flex items-center gap-3">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                                    <Icon size={20} />
                                </div>
                                <h2 className="text-lg font-bold sm:text-xl">
                                    {title}
                                </h2>
                            </div>

                            <ul className="mt-5 space-y-3 pl-1">
                                {content.map((paragraph) => (
                                    <li
                                        key={paragraph}
                                        className="flex gap-3 text-sm leading-7 text-muted-foreground"
                                    >
                                        <span className="mt-3 h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                                        <span>{paragraph}</span>
                                    </li>
                                ))}
                            </ul>
                        </article>
                    ))}
                </div>

                {/* Contact */}
                <div className="mt-8 rounded-3xl bg-primary p-7 text-primary-foreground sm:p-10">
                    <div className="flex items-center gap-3">
                        <Mail size={24} />
                        <h2 className="text-2xl font-bold">
                            Privacy Questions?
                        </h2>
                    </div>

                    <p className="mt-4 max-w-2xl leading-7 opacity-90">
                        If you have questions about this policy or how
                        information is handled on Kindora, please visit our
                        contact page.
                    </p>

                    <Link
                        href="/contact"
                        className="mt-7 inline-flex items-center gap-2 rounded-full bg-background px-6 py-3 font-semibold text-foreground transition-transform hover:scale-105"
                    >
                        Contact Us <ArrowRight size={17} />
                    </Link>
                </div>
            </section>
        </main>
    );
}
