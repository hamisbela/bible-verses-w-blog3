export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  excerpt: string;
  date: string;
  imageUrl: string;
  readTime: number;
}

export interface BlogState {
  posts: BlogPost[];
  filteredPosts: BlogPost[];
  searchTerm: string;
  loading: boolean;
  currentPost: BlogPost | null;
}