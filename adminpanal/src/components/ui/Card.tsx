import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

export const Card = ({ className, ...props }: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={clsx(
      'rounded-3xl border border-slate-800/60 bg-gradient-to-br from-slate-900/80 via-slate-900/60 to-slate-950/70 p-6 shadow-lg shadow-slate-950/40 backdrop-blur-xl',
      className
    )}
    {...props}
  />
);
