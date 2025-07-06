
export interface Profile {
  id: string;
  email: string;
  role: 'user' | 'admin';
  created_at: string;
  updated_at: string;
}

export interface Category {
  id: string;
  name: string;
  description: string;
  color: string;
  created_at: string;
}

export interface Tutorial {
  id: string;
  title: string;
  description: string;
  content: string;
  video_url?: string;
  image_url?: string;
  category_id: string;
  is_published: boolean;
  difficulty_level: 'Débutant' | 'Intermédiaire' | 'Avancé';
  duration_minutes: number;
  created_at: string;
  updated_at: string;
  category?: Category;
}

export interface UserProgress {
  id: string;
  user_id: string;
  tutorial_id: string;
  completed: boolean;
  progress_percentage: number;
  completed_at?: string;
  started_at: string;
  created_at: string;
  updated_at: string;
  tutorial?: Tutorial;
}
