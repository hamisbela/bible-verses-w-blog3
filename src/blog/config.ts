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
    'https://images.pexels.com/photos/3825011/pexels-photo-3825011.jpeg', // Open Bible with glasses
    'https://images.pexels.com/photos/3224232/pexels-photo-3224232.jpeg', // Church interior
    'https://images.pexels.com/photos/933486/pexels-photo-933486.jpeg', // Person reading Bible
    'https://images.pexels.com/photos/1701535/pexels-photo-1701535.jpeg', // Church building
    'https://images.pexels.com/photos/161060/read-book-open-literature-161060.jpeg', // Open book
    'https://images.pexels.com/photos/236326/pexels-photo-236326.jpeg', // Sunset cross silhouette
    'https://images.pexels.com/photos/2397645/pexels-photo-2397645.jpeg', // Ancient Bible
    'https://images.pexels.com/photos/3768894/pexels-photo-3768894.jpeg', // Church window
    'https://images.pexels.com/photos/3141079/pexels-photo-3141079.jpeg', // Person praying
    'https://images.pexels.com/photos/2258536/pexels-photo-2258536.jpeg', // Stained glass window
    'https://images.pexels.com/photos/33363/prayer-church-light-candle.jpg', // Prayer candles
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