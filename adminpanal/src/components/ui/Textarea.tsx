import { forwardRef, TextareaHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, ...props }, ref) => (
    <textarea
      ref={ref}
      className={clsx(
        'w-full rounded-2xl border border-slate-800/70 bg-slate-900/60 px-4 py-3 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
        className
      )}
      {...props}
    />
  )
);

Textarea.displayName = 'Textarea';
