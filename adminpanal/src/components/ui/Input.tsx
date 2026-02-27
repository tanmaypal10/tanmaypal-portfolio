import { forwardRef, InputHTMLAttributes } from 'react';
import { clsx } from 'clsx';

type InputProps = InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={clsx(
      'w-full rounded-xl border border-slate-800/80 bg-slate-900/60 px-4 py-2 text-sm text-slate-100 placeholder:text-slate-500 transition focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/40',
      className
    )}
    {...props}
  />
));

Input.displayName = 'Input';
