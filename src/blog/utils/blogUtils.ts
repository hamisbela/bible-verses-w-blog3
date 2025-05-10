import { BlogPost } from '../types';
import { blogConfig } from '../config';

// Generate a slug from the title
export const slugify = (text: string): string => {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
};

// Get a random feature image from the config
export const getRandomFeatureImage = (): string => {
  const images = blogConfig.featureImages;
  return images[Math.floor(Math.random() * images.length)];
};

// Estimate read time based on word count
export const estimateReadTime = (content: string): number => {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
};

// Extract an excerpt from content
export const extractExcerpt = (content: string, maxLength = 160): string => {
  if (content.length <= maxLength) return content;
  
  // Try to find a period or other sentence-ending punctuation
  const endOfSentence = content.substring(0, maxLength).lastIndexOf('.');
  
  if (endOfSentence > 0) {
    return content.substring(0, endOfSentence + 1);
  }
  
  // If no sentence end found, cut at a word boundary
  const excerpt = content.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  
  return excerpt.substring(0, lastSpace) + '...';
};

// Get related posts based on current post
export const getRelatedPosts = (currentPost: BlogPost, allPosts: BlogPost[], count = 3): BlogPost[] => {
  // Filter out the current post
  const otherPosts = allPosts.filter(post => post.id !== currentPost.id);
  
  // For a real implementation, you would use some kind of relevance algorithm
  // For this example, just return random posts
  const shuffled = [...otherPosts].sort(() => 0.5 - Math.random());
  
  return shuffled.slice(0, count);
};

// Format a date string
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });
};

// Parse markdown content to create a BlogPost object
export const parseMarkdownToPost = (content: string, filename: string): BlogPost => {
  // Extract title from the first line (assuming it's a markdown h1)
  const titleMatch = content.match(/^# (.+)$/m);
  const title = titleMatch ? titleMatch[1].trim() : filename.replace('.md', '');
  
  // Remove the title from the content
  const contentWithoutTitle = titleMatch 
    ? content.replace(titleMatch[0], '').trim() 
    : content.trim();
  
  const slug = slugify(title);
  const imageUrl = getRandomFeatureImage();
  const excerpt = extractExcerpt(contentWithoutTitle);
  const readTime = estimateReadTime(contentWithoutTitle);
  
  return {
    id: slug,
    slug,
    title,
    content: contentWithoutTitle,
    excerpt,
    date: new Date().toISOString(), // Using current date since no date in markdown
    imageUrl,
    readTime
  };
};

// Search posts by term
export const searchPosts = (posts: BlogPost[], term: string): BlogPost[] => {
  if (!term.trim()) return posts;
  
  const searchTerm = term.toLowerCase();
  
  return posts.filter(post => 
    post.title.toLowerCase().includes(searchTerm) || 
    post.content.toLowerCase().includes(searchTerm)
  );
};