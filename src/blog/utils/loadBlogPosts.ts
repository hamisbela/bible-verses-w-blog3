import { BlogPost } from '../types';

// In development, we return an empty array or mock data
// In production, this will be populated with real data from the zip file
export const loadBlogPosts = async (): Promise<BlogPost[]> => {
  // Check if we're in development
  if (import.meta.env.DEV) {
    console.log('Development environment detected, using mock blog posts');
    return getMockPosts();
  }
  
  try {
    // In production, blog posts should be loaded from the extracted data
    const response = await fetch('/blog-data.json');
    if (!response.ok) {
      console.error('Failed to load blog posts:', response.statusText);
      return [];
    }
    
    const posts = await response.json();
    return posts;
  } catch (error) {
    console.error('Error loading blog posts:', error);
    return [];
  }
};

// Mock data for development
const getMockPosts = (): BlogPost[] => {
  return [
    {
      id: 'understanding-gods-love',
      slug: 'understanding-gods-love',
      title: 'Understanding God\'s Love: A Biblical Perspective',
      content: 'This is a sample post about God\'s love. In this post, we explore biblical passages that illustrate divine love...',
      excerpt: 'This is a sample post about God\'s love. In this post, we explore biblical passages that illustrate divine love...',
      date: new Date().toISOString(),
      imageUrl: 'https://images.pexels.com/photos/267076/pexels-photo-267076.jpeg',
      readTime: 5
    },
    {
      id: 'daily-devotional-habits',
      slug: 'daily-devotional-habits',
      title: 'Building Daily Devotional Habits for Spiritual Growth',
      content: 'Consistency in scripture reading is key to spiritual growth. This post discusses methods to build lasting devotional habits...',
      excerpt: 'Consistency in scripture reading is key to spiritual growth. This post discusses methods to build lasting devotional habits...',
      date: new Date(Date.now() - 86400000).toISOString(), // Yesterday
      imageUrl: 'https://images.pexels.com/photos/5752601/pexels-photo-5752601.jpeg',
      readTime: 4
    },
    {
      id: 'verses-for-difficult-times',
      slug: 'verses-for-difficult-times',
      title: 'Comforting Bible Verses for Difficult Times',
      content: 'When life gets challenging, scripture offers comfort and perspective. Here are key verses to remember during trials...',
      excerpt: 'When life gets challenging, scripture offers comfort and perspective. Here are key verses to remember during trials...',
      date: new Date(Date.now() - 172800000).toISOString(), // 2 days ago
      imageUrl: 'https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg',
      readTime: 3
    },
    {
      id: 'prayer-techniques',
      slug: 'prayer-techniques',
      title: 'Effective Prayer Techniques from Biblical Examples',
      content: 'Learn from biblical prayer examples to deepen your own practice. This guide examines prayer patterns from key figures...',
      excerpt: 'Learn from biblical prayer examples to deepen your own practice. This guide examines prayer patterns from key figures...',
      date: new Date(Date.now() - 259200000).toISOString(), // 3 days ago
      imageUrl: 'https://images.pexels.com/photos/266076/pexels-photo-266076.jpeg',
      readTime: 6
    },
    {
      id: 'understanding-biblical-context',
      slug: 'understanding-biblical-context',
      title: 'The Importance of Understanding Biblical Context',
      content: 'Context is crucial for proper scripture interpretation. This article explains how historical and cultural context impacts meaning...',
      excerpt: 'Context is crucial for proper scripture interpretation. This article explains how historical and cultural context impacts meaning...',
      date: new Date(Date.now() - 345600000).toISOString(), // 4 days ago
      imageUrl: 'https://images.pexels.com/photos/208371/pexels-photo-208371.jpeg',
      readTime: 7
    }
  ];
};