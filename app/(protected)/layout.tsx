import ProtectedRouteGuard from '@/components/auth/ProtectedRouteGuard';
import { Suspense } from 'react';

type ProtectedLayoutProps = {
    children: React.ReactNode;
};

export default function ProtectedLayout({ children }: ProtectedLayoutProps) {
    return (
        <Suspense
            fallback={
                <div className="flex min-h-[50vh] items-center justify-center">
                    <p className="text-sm text-muted-foreground">
                        Checking authentication...
                    </p>
                </div>
            }
        >
            <ProtectedRouteGuard>{children}</ProtectedRouteGuard>
        </Suspense>
    );
}
