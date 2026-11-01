export function getSafeCallbackURL(): string {
    if (typeof window === 'undefined') return '/';

    const callbackURL = new URLSearchParams(window.location.search).get(
        'callbackURL',
    );

    if (
        !callbackURL ||
        !callbackURL.startsWith('/') ||
        callbackURL.startsWith('//') ||
        callbackURL.includes('\\')
    ) {
        return '/';
    }

    const target = new URL(callbackURL, window.location.origin);

    if (target.origin !== window.location.origin) {
        return '/';
    }

    return `${target.pathname}${target.search}${target.hash}`;
}
