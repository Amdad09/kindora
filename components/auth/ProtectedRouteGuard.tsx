import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { redirect } from 'next/navigation';
import type { ReactNode } from 'react';

type ProtectedRouteGuardProps = {
    children: ReactNode;
};

export default async function ProtectedRouteGuard({
    children,
}: ProtectedRouteGuardProps) {
    const requestHeaders = await headers();

    const session = await auth.api.getSession({
        headers: requestHeaders,
    });

    if (!session) {
        const currentPath = requestHeaders.get('x-kindora-path') || '/';

        redirect(`/login?callbackURL=${encodeURIComponent(currentPath)}`);
    }

    return <>{children}</>;
}
