import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { ImagePlus, Trash2 } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import type { GalleryItem } from '@/types';

export const GalleryPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    image: null as File | null,
  });

  const { data, isLoading } = useQuery<GalleryItem[]>({
    queryKey: ['gallery', token],
    queryFn: () => api.getGallery(token!),
    enabled: Boolean(token),
  });

  const uploadImage = useMutation({
    mutationFn: () => {
      if (!formData.image) throw new Error('Select an image');
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('category', formData.category);
      payload.append('image', formData.image);
      return api.uploadGalleryItem(payload, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gallery'] });
      setFormData({ title: '', category: '', image: null });
    },
  });

  const deleteImage = useMutation({
    mutationFn: (id: string) => api.deleteGalleryItem(id, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gallery'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    uploadImage.mutate();
  };

  return (
    <div className="space-y-8">
      <div>
        <p className="text-sm uppercase tracking-[0.3em] text-primary">Gallery</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">Visual assets</h1>
        <p className="text-sm text-slate-400">Upload and curate showcase images.</p>
      </div>

      <Card>
        <form className="grid gap-4 md:grid-cols-3" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Title</label>
            <Input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Category</label>
            <Input value={formData.category} onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))} />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Image</label>
            <label className="flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <ImagePlus className="h-4 w-4" />
                {formData.image ? formData.image.name : 'Upload image'}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files?.[0] ?? null }))} />
            </label>
          </div>
          <div className="md:col-span-3">
            <Button type="submit" loading={uploadImage.isPending}>
              Upload asset
            </Button>
          </div>
        </form>
      </Card>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {isLoading && <p className="text-sm text-slate-500">Loading gallery…</p>}
        {!isLoading && data?.length === 0 && <p className="text-sm text-slate-500">No gallery items yet.</p>}
        {data?.map((item) => (
          <div key={item._id} className="group relative overflow-hidden rounded-3xl border border-slate-800/70 bg-slate-900/40">
            <img src={item.url || item.filePath} alt={item.title} className="h-60 w-full object-cover transition duration-700 group-hover:scale-105" />
            <div className="absolute inset-0 flex flex-col justify-between bg-gradient-to-b from-transparent via-slate-950/20 to-slate-950/90 p-4 opacity-0 transition group-hover:opacity-100">
              <div className="flex justify-end">
                <Button
                  variant="destructive"
                  className="h-9 rounded-2xl px-3"
                  onClick={() => deleteImage.mutate(item._id)}
                  loading={deleteImage.isPending}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div>
                <p className="text-xs uppercase tracking-[0.4em] text-slate-400">{item.category || 'General'}</p>
                <h3 className="text-lg font-semibold text-white">{item.title || 'Untitled asset'}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
