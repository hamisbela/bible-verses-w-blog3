import { BookOpen } from 'lucide-react';

export const blogConfig = {
  // Site information
  title: 'Random Bible Verse Blog',
  description: 'Insights, devotionals, and inspiration from God\'s Word',
  
  // Feature images (from Pexels) - Bible and Christianity related
  featureImages: [
    'https://images.pexels.com/photos/267076/pexels-photo-267076.jpeg', // Bible
    'https://images.pexels.com/photos/5752601/pexels-photo-5752601.jpeg', // Open Bible
    'https://images.pexels.com/photos/531321/pexels-photo-531321.jpeg', // Church
    'https://images.pexels.com/photos/266076/pexels-photo-266076.jpeg', // Praying hands
    'https://images.pexels.com/photos/208371/pexels-photo-208371.jpeg', // Cross
    'https://images.pexels.com/photos/372326/pexels-photo-372326.jpeg', // Bible study
    'https://images.pexels.com/photos/415571/pexels-photo-415571.jpeg', // Prayer
  ],
  
  // Social sharing options
  socialSharing: [
    { name: 'Twitter', url: 'https://twitter.com/intent/tweet?text=' },
    { name: 'Facebook', url: 'https://www.facebook.com/sharer/sharer.php?u=' },
    { name: 'LinkedIn', url: 'https://www.linkedin.com/shareArticle?mini=true&url=' },
    { name: 'Pinterest', url: 'https://pinterest.com/pin/create/button/?url=' },
  ],
  
  // CTA Information
  cta: {
    title: 'Find Inspiring Bible Verses',
    description: 'Generate verses that speak to your heart with our free Bible Verse Generator.',
    buttonText: 'Try It Now',
    buttonUrl: '/',
    icon: BookOpen,
  },
  
  // Posts per page on blog index
  postsPerPage: 18,
  
  // Number of related posts to show
  relatedPostsCount: 3,
  
  // Blog post filename patterns to match in zip
  postFilePattern: '*.md',
  
  // Path where zip file will be uploaded (relative to public)
  zipPath: '/blog-posts.zip',
  
  // Path where posts will be extracted (only used during build)
  extractPath: 'temp-posts',
};