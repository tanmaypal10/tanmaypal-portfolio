import type { ContactMessage, DashboardStats, GalleryItem, Project } from '@/types';
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5001/api';

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

interface RequestOptions {
  method?: HttpMethod;
  body?: unknown;
  token?: string | null;
  isFormData?: boolean;
}

async function apiRequest<T>(endpoint: string, options: RequestOptions = {}): Promise<T> {
  const headers: Record<string, string> = {};
  let body: BodyInit | undefined;

  if (options.isFormData && options.body instanceof FormData) {
    body = options.body;
  } else if (options.body) {
    headers['Content-Type'] = 'application/json';
    body = JSON.stringify(options.body);
  }

  if (options.token) {
    headers.Authorization = `Bearer ${options.token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: options.method || 'GET',
    headers,
    body,
    credentials: 'include',
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({}));
    throw new Error(errorBody.message || 'Something went wrong');
  }

  if (response.status === 204) {
    return {} as T;
  }

  return response.json() as Promise<T>;
}

export const api = {
  login: (payload: { email: string; password: string }) =>
    apiRequest<{ token: string; admin: { email: string; name: string } }>('/admin/auth/login', {
      method: 'POST',
      body: payload,
    }),
  getDashboardStats: (token: string) => apiRequest<DashboardStats>('/admin/dashboard', { token }),
  getProjects: (token: string) => apiRequest<Project[]>('/projects', { token }),
  createProject: (payload: FormData, token: string) =>
    apiRequest('/projects', { method: 'POST', body: payload, token, isFormData: true }),
  updateProject: (id: string, payload: FormData, token: string) =>
    apiRequest(`/projects/${id}`, { method: 'PUT', body: payload, token, isFormData: true }),
  deleteProject: (id: string, token: string) =>
    apiRequest(`/projects/${id}`, { method: 'DELETE', token }),
  getGallery: (token: string) => apiRequest<GalleryItem[]>('/gallery', { token }),
  uploadGalleryItem: (payload: FormData, token: string) =>
    apiRequest('/gallery', { method: 'POST', body: payload, token, isFormData: true }),
  deleteGalleryItem: (id: string, token: string) =>
    apiRequest(`/gallery/${id}`, { method: 'DELETE', token }),
  getMessages: (token: string) => apiRequest<ContactMessage[]>('/contact', { token }),
  deleteMessage: (id: string, token: string) =>
    apiRequest(`/contact/${id}`, { method: 'DELETE', token }),
};
