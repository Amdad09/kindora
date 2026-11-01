'use client';

import { authClient } from '@/lib/auth-client';

export default function TestJWT() {
    const handleGetToken = async () => {
        const { data, error } = await authClient.token();

        if (error) {
            console.error(error);
            return;
        }

        console.log('JWT:', data.token);
    };

    return (
        <button className='border px-2 py-1' onClick={handleGetToken}>
            Get JWT Token
        </button>
    );
}