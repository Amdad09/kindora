import { signIn } from '@/lib/auth-client';
import { getSafeCallbackURL } from '@/lib/auth-redirect';
import { useState } from 'react';
import { toast } from 'sonner';
const GoogleIcon = () => (
    <svg viewBox="0 0 48 48" className="h-5 w-5" aria-hidden="true">
        <path
            fill="#EA4335"
            d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5Z"
        />
        <path
            fill="#4285F4"
            d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.9c-.58 2.96-2.26 5.47-4.72 7.16l7.3 5.67c4.26-3.93 7.5-9.73 7.5-17.3Z"
        />
        <path
            fill="#FBBC05"
            d="M10.54 28.59A14.4 14.4 0 0 1 9.75 24c0-1.59.27-3.12.75-4.59l-7.98-6.19A23.9 23.9 0 0 0 0 24c0 3.86.92 7.52 2.56 10.78l7.98-6.19Z"
        />
        <path
            fill="#34A853"
            d="M24 48c6.47 0 11.91-2.13 15.88-5.8l-7.3-5.67c-2.02 1.35-4.6 2.15-8.58 2.15-6.26 0-11.57-4.22-13.46-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48Z"
        />
    </svg>
);
const GoogleAuthButton = () => {
    const [googleLoading, setGoogleLoading] = useState(false);

    const handleGoogleSignIn = async () => {
        try {
            setGoogleLoading(true);

            const { error } = await signIn.social({
                provider: 'google',
                callbackURL: getSafeCallbackURL(),
            });

            if (error) {
                toast.error(error.message || 'Google sign in failed');
            }
        } catch {
            toast.error('Something went wrong. Please try again.');
        } finally {
            setGoogleLoading(false);
        }
    };
  return (
      <button
          type="button"
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          className="flex w-full items-center justify-center gap-3 rounded-xl border border-border bg-background px-4 py-3 text-sm font-semibold transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-60"
      >
          <GoogleIcon />
          {googleLoading ? 'Connecting to Google...' : 'Continue with Google'}
      </button>
  );
};

export default GoogleAuthButton;