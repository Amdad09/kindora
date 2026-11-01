'use client';

import { AlertTriangle, Trash2 } from 'lucide-react';
import { toast } from 'sonner';

interface ConfirmDeleteToastProps {
    id: string | number;
    title: string;
    description?: string;
    confirmLabel?: string;
    onConfirm: () => Promise<void> | void;
}

const ConfirmDeleteToast = ({
    id,
    title,
    description = 'This action cannot be undone.',
    confirmLabel = 'Delete',
    onConfirm,
}: ConfirmDeleteToastProps) => {
    const handleConfirm = () => {
        toast.dismiss(id);
        void onConfirm();
    };

    return (
        <div className="w-[min(92vw,360px)] rounded-2xl border border-border bg-card p-5 shadow-xl">
            <div className="flex items-start gap-4">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-destructive/10 text-destructive">
                    <AlertTriangle size={22} />
                </div>

                <div className="flex-1">
                    <h3 className="text-base font-bold text-foreground">
                        {title}
                    </h3>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                        {description}
                    </p>
                </div>
            </div>

            <div className="mt-5 flex items-center justify-end gap-3">
                <button
                    type="button"
                    onClick={() => toast.dismiss(id)}
                    className="rounded-lg border border-border bg-muted px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-muted/70"
                >
                    Cancel
                </button>

                <button
                    type="button"
                    onClick={handleConfirm}
                    className="inline-flex items-center gap-2 rounded-lg bg-destructive px-4 py-2 text-sm font-semibold text-white transition-opacity hover:opacity-90"
                >
                    <Trash2 size={16} />
                    {confirmLabel}
                </button>
            </div>
        </div>
    );
};

export const confirmDelete = (options: {
    title: string;
    description?: string;
    onConfirm: () => Promise<void> | void;
}) => {
    toast.custom(
        (id) => (
            <ConfirmDeleteToast
                id={id}
                title={options.title}
                description={options.description}
                onConfirm={options.onConfirm}
            />
        ),
        { duration: Infinity },
    );
};
