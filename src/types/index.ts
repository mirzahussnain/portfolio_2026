
export interface Project {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  tags: string[];
  liveUrl?: string;
  githubUrl?: string;
  version?: string;
  icon?: string;
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  type: 'work' | 'education';
  tags: string[];
  icon: string;
}

export interface Skill {
  id: string;
  name: string;
  category: 'frontend' | 'backend' | 'cloud' | 'tools';
  level: 'Expert' | 'Advanced' | 'Intermediate' | 'Beginner';
  icon: string;
  colorClass: string;
}

export type ViewState = 'main' | 'admin' | 'signin';
