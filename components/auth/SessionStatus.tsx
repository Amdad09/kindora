'use client';

import { useSession } from '@/lib/auth-client';

const SessionStatus = () => {
    const { data: session, isPending, error } = useSession();

    if (isPending) {
        return <p>Checking session...</p>;
    }

    if (error) {
        return <p>Unable to check session.</p>;
    }

    if (!session) {
        return <p>You are not logged in.</p>;
    }

    return (
        <div>
            <p>Logged in successfully!</p>
            <p>Name: {session.user.name}</p>
            <p>Email: {session.user.email}</p>
        </div>
    );
};

export default SessionStatus;
