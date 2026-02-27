import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { MailOpen, Trash2, Search } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import type { ContactMessage } from '@/types';
import { formatDateTime } from '@/lib/utils';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';

export const MessagesPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [selected, setSelected] = useState<ContactMessage | null>(null);
  const [search, setSearch] = useState('');

  const { data, isLoading } = useQuery<ContactMessage[]>({
    queryKey: ['messages', token],
    queryFn: () => api.getMessages(token!),
    enabled: Boolean(token),
  });

  const deleteMessage = useMutation({
    mutationFn: (id: string) => api.deleteMessage(id, token!),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['messages'] });
      setSelected(null);
    },
  });

  const filteredMessages = data?.filter((message) => {
    const term = search.toLowerCase();
    return (
      message.name.toLowerCase().includes(term) ||
      message.email.toLowerCase().includes(term) ||
      message.subject.toLowerCase().includes(term)
    );
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Messages</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Inbox</h1>
          <p className="text-sm text-slate-400">Review and respond to portfolio inquiries.</p>
        </div>
        <div className="flex items-center gap-2 rounded-2xl border border-slate-800/70 bg-slate-900/60 px-3 py-2 text-sm text-slate-400">
          <Search className="h-4 w-4" />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-slate-200 outline-none"
            placeholder="Search messages"
          />
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-[320px_1fr]">
        <Card className="space-y-3 p-0">
          <div className="border-b border-slate-800/60 px-6 py-4 text-sm text-slate-400">
            {filteredMessages ? `${filteredMessages.length} conversations` : '—'}
          </div>
          <div className="max-h-[70vh] space-y-2 overflow-y-auto px-3 py-4">
            {isLoading && <p className="px-3 text-sm text-slate-500">Loading messages…</p>}
            {!isLoading && filteredMessages?.length === 0 && <p className="px-3 text-sm text-slate-500">No messages found.</p>}
            {filteredMessages?.map((message) => (
              <button
                key={message._id}
                onClick={() => setSelected(message)}
                className={`w-full rounded-2xl border border-transparent px-4 py-3 text-left transition ${
                  selected?._id === message._id
                    ? 'border-primary/40 bg-primary/5'
                    : 'hover:border-slate-800/80 hover:bg-slate-900/40'
                }`}
              >
                <p className="text-sm font-semibold text-white">{message.name}</p>
                <p className="truncate text-xs text-slate-500">{message.subject}</p>
                <p className="mt-1 text-xs text-slate-500">{formatDateTime(message.createdAt)}</p>
              </button>
            ))}
          </div>
        </Card>

        <Card className="min-h-[60vh] space-y-4">
          {selected ? (
            <>
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Message from</p>
                  <h2 className="text-2xl font-semibold text-white">{selected.name}</h2>
                  <p className="text-sm text-slate-400">{selected.email}</p>
                </div>
                <Button
                  variant="destructive"
                  onClick={() => deleteMessage.mutate(selected._id)}
                  loading={deleteMessage.isPending}
                >
                  <Trash2 className="mr-2 h-4 w-4" /> Delete
                </Button>
              </div>
              <div className="rounded-2xl border border-slate-800/60 bg-slate-900/40 p-4 text-sm text-slate-300">
                <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Subject</p>
                <p className="text-lg font-semibold text-white">{selected.subject}</p>
                <div className="mt-6 space-y-3">
                  <p className="text-xs uppercase tracking-[0.3em] text-slate-500">Message</p>
                  <p className="whitespace-pre-line leading-relaxed">{selected.message}</p>
                </div>
                <div className="mt-6 flex items-center gap-2 text-xs text-slate-500">
                  <MailOpen className="h-4 w-4" />
                  Received on {formatDateTime(selected.createdAt)}
                </div>
              </div>
            </>
          ) : (
            <div className="flex h-full flex-col items-center justify-center gap-3 text-center text-slate-500">
              <MailOpen className="h-10 w-10" />
              <p>Select a message to view details.</p>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
};
