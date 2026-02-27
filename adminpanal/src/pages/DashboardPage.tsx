import { useQuery } from '@tanstack/react-query';
import { FolderGit2, Images, Mail } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { StatCard } from '@/components/dashboard/StatCard';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { formatDateTime, truncate } from '@/lib/utils';

export const DashboardPage = () => {
  const { token } = useAuth();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['dashboard', token],
    queryFn: () => api.getDashboardStats(token!),
    enabled: Boolean(token),
  });

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Overview</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Dashboard</h1>
          <p className="text-sm text-slate-400">Monitor portfolio activity and latest updates.</p>
        </div>
        <Button variant="ghost" onClick={() => refetch()} disabled={isLoading}>
          Refresh data
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <StatCard
          label="Projects"
          value={isLoading ? '—' : data?.totals.projects ?? 0}
          icon={<FolderGit2 className="h-6 w-6" />}
          trend="Curated case studies"
        />
        <StatCard
          label="Gallery"
          value={isLoading ? '—' : data?.totals.gallery ?? 0}
          icon={<Images className="h-6 w-6" />}
          trend="Showcase visuals"
        />
        <StatCard
          label="Messages"
          value={isLoading ? '—' : data?.totals.messages ?? 0}
          icon={<Mail className="h-6 w-6" />}
          trend="Leads this month"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Latest Messages</p>
              <h2 className="text-xl font-semibold text-white">Inbox preview</h2>
            </div>
            <span className="text-xs text-slate-500">Last 5 entries</span>
          </div>
          <div className="space-y-3">
            {isLoading && <p className="text-sm text-slate-500">Loading messages...</p>}
            {!isLoading && data?.latestMessages?.length === 0 && (
              <p className="text-sm text-slate-500">No messages yet.</p>
            )}
            {data?.latestMessages?.map((message) => (
              <div key={message._id} className="rounded-2xl border border-slate-800/70 bg-slate-900/40 p-4">
                <div className="flex items-center justify-between text-sm">
                  <p className="font-semibold text-white">{message.name}</p>
                  <span className="text-xs text-slate-500">{formatDateTime(message.createdAt)}</span>
                </div>
                <p className="mt-2 text-sm text-slate-300">{truncate(message.message, 140)}</p>
              </div>
            ))}
          </div>
        </Card>

        <Card className="space-y-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-500">System status</p>
            <h2 className="text-xl font-semibold text-white">Backend heartbeat</h2>
          </div>
          <div className="space-y-4 text-sm text-slate-300">
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/50 px-4 py-3">
              <span>API endpoint</span>
              <code className="rounded-lg bg-slate-950/80 px-3 py-1 text-xs text-primary">
                {import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}
              </code>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/50 px-4 py-3">
              <span>Auth status</span>
              <span className="text-emerald-400">Connected</span>
            </div>
            <div className="flex items-center justify-between rounded-2xl bg-slate-900/50 px-4 py-3">
              <span>Last refresh</span>
              <span className="text-slate-400">{new Date().toLocaleString()}</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};
