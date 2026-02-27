export interface Project {
  _id: string;
  title: string;
  description: string;
  tags?: string[];
  techStack?: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface GalleryItem {
  _id: string;
  title?: string;
  category?: string;
  fileName: string;
  filePath: string;
  url?: string;
  createdAt?: string;
}

export interface ContactMessage {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status?: string;
  createdAt: string;
}

export interface DashboardStats {
  totals: {
    projects: number;
    gallery: number;
    messages: number;
  };
  latestMessages: Pick<ContactMessage, '_id' | 'name' | 'message' | 'createdAt'>[];
}
