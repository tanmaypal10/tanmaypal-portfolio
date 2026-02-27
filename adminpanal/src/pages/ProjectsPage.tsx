import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Plus, Pencil, Trash2, UploadCloud } from 'lucide-react';
import { useAuth } from '@/context/AuthContext';
import { api } from '@/lib/api';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import type { Project } from '@/types';

export const ProjectsPage = () => {
  const { token } = useAuth();
  const queryClient = useQueryClient();
  const [editingProject, setEditingProject] = useState<Project | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    techStack: '',
    githubUrl: '',
    liveUrl: '',
    image: null as File | null,
  });

  const { data, isLoading } = useQuery<Project[]>({
    queryKey: ['projects', token],
    queryFn: () => api.getProjects(token!),
    enabled: Boolean(token),
  });

  const upsertProject = useMutation({
    mutationFn: async () => {
      const payload = new FormData();
      payload.append('title', formData.title);
      payload.append('description', formData.description);
      payload.append('techStack', formData.techStack);
      payload.append('githubUrl', formData.githubUrl);
      payload.append('liveUrl', formData.liveUrl);
      if (formData.image) payload.append('image', formData.image);

      if (editingProject) {
        return api.updateProject(editingProject._id, payload, token!);
      }
      return api.createProject(payload, token!);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['projects'] });
      resetForm();
    },
  });

  const deleteProject = useMutation({
    mutationFn: (projectId: string) => api.deleteProject(projectId, token!),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['projects'] }),
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    upsertProject.mutate();
  };

  const resetForm = () => {
    setEditingProject(null);
    setFormData({ title: '', description: '', techStack: '', githubUrl: '', liveUrl: '', image: null });
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.3em] text-primary">Projects</p>
          <h1 className="mt-2 text-3xl font-semibold text-white">Portfolio entries</h1>
          <p className="text-sm text-slate-400">Create, update, or remove featured projects.</p>
        </div>
        <Button variant="ghost" onClick={resetForm}>
          <Plus className="mr-2 h-4 w-4" /> New project
        </Button>
      </div>

      <Card>
        <form className="grid gap-4 md:grid-cols-2" onSubmit={handleSubmit}>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Title</label>
            <Input value={formData.title} onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))} required />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Tech Stack</label>
            <Input
              placeholder="React, Node.js"
              value={formData.techStack}
              onChange={(e) => setFormData((prev) => ({ ...prev, techStack: e.target.value }))}
            />
          </div>
          <div className="md:col-span-2 space-y-1">
            <label className="text-sm text-slate-300">Description</label>
            <Textarea
              rows={3}
              value={formData.description}
              onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
              required
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">GitHub URL</label>
            <Input
              type="url"
              value={formData.githubUrl}
              onChange={(e) => setFormData((prev) => ({ ...prev, githubUrl: e.target.value }))}
            />
          </div>
          <div className="space-y-1">
            <label className="text-sm text-slate-300">Live URL</label>
            <Input type="url" value={formData.liveUrl} onChange={(e) => setFormData((prev) => ({ ...prev, liveUrl: e.target.value }))} />
          </div>
          <div className="md:col-span-2">
            <label className="text-sm text-slate-300">Project image</label>
            <label className="mt-2 flex cursor-pointer items-center justify-between rounded-2xl border border-dashed border-slate-700 px-4 py-3 text-sm text-slate-400">
              <span className="flex items-center gap-2">
                <UploadCloud className="h-4 w-4" />
                {formData.image ? formData.image.name : 'Upload image'}
              </span>
              <input type="file" accept="image/*" className="hidden" onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files?.[0] ?? null }))} />
            </label>
          </div>
          <div className="md:col-span-2 flex gap-3">
            <Button type="submit" loading={upsertProject.isPending}>
              {editingProject ? 'Update project' : 'Add project'}
            </Button>
            {editingProject && (
              <Button type="button" variant="ghost" onClick={resetForm}>
                Cancel edit
              </Button>
            )}
          </div>
        </form>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        {isLoading && <p className="text-sm text-slate-500">Loading projects…</p>}
        {!isLoading && data?.length === 0 && <p className="text-sm text-slate-500">No projects yet.</p>}
        {data?.map((project) => (
          <Card key={project._id} className="space-y-3">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-semibold text-white">{project.title}</h3>
                <p className="text-sm text-slate-400">{project.techStack?.join(', ') || formData.techStack}</p>
              </div>
              <div className="flex gap-2">
                <Button variant="ghost" onClick={() => { setEditingProject(project); setFormData({
                      title: project.title,
                      description: project.description,
                      techStack: project.techStack?.join(', ') || '',
                      githubUrl: project.githubUrl || '',
                      liveUrl: project.liveUrl || '',
                      image: null,
                    });
                  }}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" onClick={() => deleteProject.mutate(project._id)} loading={deleteProject.isPending}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
            <p className="text-sm text-slate-300">{project.description}</p>
          </Card>
        ))}
      </div>
    </div>
  );
};
