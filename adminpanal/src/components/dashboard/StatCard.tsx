import { HTMLAttributes } from 'react';
import { clsx } from 'clsx';

interface StatCardProps extends HTMLAttributes<HTMLDivElement> {
  label: string;
  value: number | string;
  icon?: React.ReactNode;
  trend?: string;
}

export const StatCard = ({ label, value, icon, trend, className, ...props }: StatCardProps) => (
  <div
    className={clsx(
      'relative overflow-hidden rounded-3xl border border-slate-800/80 bg-gradient-to-tr from-slate-900 via-slate-900/80 to-slate-950 p-6 shadow-lg shadow-slate-950/30 backdrop-blur-2xl transition hover:-translate-y-1 hover:border-slate-700/80',
      className
    )}
    {...props}
  >
    <div className="flex items-center justify-between">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-slate-500">{label}</p>
        <p className="mt-3 text-4xl font-semibold text-white">{value}</p>
        {trend && <p className="mt-2 text-xs text-emerald-400">{trend}</p>}
      </div>
      {icon && <div className="rounded-2xl bg-primary/15 p-3 text-primary">{icon}</div>}
    </div>
    <div className="pointer-events-none absolute inset-0 -z-10 opacity-40 blur-3xl" style={{ background: 'radial-gradient(circle, rgba(59,130,246,0.5), transparent 60%)' }} />
  </div>
);
