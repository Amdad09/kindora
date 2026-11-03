import { useRouter } from 'next/navigation';
import { signOut } from '@/lib/auth-client';
import { LogOut } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';

const Logout = () => {
    const [isLoggingOut, setIsLoggingOut] = useState(false);
    const router = useRouter();
    const handleLogout = async () => {
            try {
                setIsLoggingOut(true);
    
                const { error } = await signOut();
    
                if (error) {
                    toast.error(error.message || 'Logout failed');
                    return;
                }
    
                toast.success('Logged out successfully');
                router.push('/');
                router.refresh();
            } catch (error) {
                console.error('Logout error:', error);
                toast.error('Something went wrong. Please try again.');
            } finally {
                setIsLoggingOut(false);
            }
        };
  return (
      <button
          type="button"
          onClick={handleLogout}
          disabled={isLoggingOut}
          className="flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10 disabled:opacity-50"
      >
          <LogOut size={16} />
          {isLoggingOut ? 'Logging out...' : 'Logout'}
      </button>
  );
};

export default Logout;