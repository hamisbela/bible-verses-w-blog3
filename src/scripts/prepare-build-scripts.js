import fs from 'fs-extra';
import path from 'path';

// This script prepares the blog extraction script for production use
// It copies the necessary blog extraction code to the dist-scripts folder
// so it can be run after the build process

async function prepareBuildScripts() {
  console.log('Preparing build scripts...');
  
  // Create dist-scripts directory
  const distScriptsDir = path.join(process.cwd(), 'dist-scripts');
  await fs.ensureDir(distScriptsDir);
  
  // Convert the blog extract script to an ES Module for Node.js compatibility
  // since package.json has "type": "module"
  const extractScriptContent = await fs.readFile(
    path.join(process.cwd(), 'src', 'blog', 'extract-posts.js'),
    'utf-8'
  );
  
  // Replace placeholder code with actual implementation - as ES module
  const actualImplementation = `
// ES Module version for Node.js with type: module
import fs from 'fs-extra';
import path from 'path';
import JSZip from 'jszip';
import { fileURLToPath } from 'url';

// Get directory name in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Utility functions for blog post processing
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\\s+/g, '-')
    .replace(/[^\\w-]+/g, '')
    .replace(/--+/g, '-');
}

function getRandomFeatureImage() {
  const images = [
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
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

function extractExcerpt(content, maxLength = 160) {
  if (content.length <= maxLength) return content;
  
  const endOfSentence = content.substring(0, maxLength).lastIndexOf('.');
  
  if (endOfSentence > 0) {
    return content.substring(0, endOfSentence + 1);
  }
  
  const excerpt = content.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  
  return excerpt.substring(0, lastSpace) + '...';
}

// Extract plain text from markdown for meta tags
function extractPlainTextExcerpt(markdown, maxLength = 160) {
  // Simple markdown to text conversion for meta tags
  let text = markdown
    .replace(/#{1,6}\\s+/g, '') // Remove headers
    .replace(/\\*\\*|\\*|__|\\|_/g, '') // Remove bold, italic
    .replace(/\\[([^\\]]+)\\]\\([^)]+\\)/g, '$1') // Replace links with just their text
    .replace(/!\\[([^\\]]+)\\]\\([^)]+\\)/g, '$1') // Replace images with alt text
    .replace(/\`{1,3}[^\`]+\`{1,3}/g, '') // Remove code blocks
    .replace(/\\n+/g, ' ') // Replace newlines with spaces
    .trim();
  
  // Find the first sentence
  const firstSentenceEnd = text.match(/[.!?](\\s|$)/);
  if (firstSentenceEnd && firstSentenceEnd.index !== undefined && firstSentenceEnd.index < maxLength) {
    return text.substring(0, firstSentenceEnd.index + 1);
  }
  
  // If no sentence end found or it's too long
  if (text.length <= maxLength) return text;
  
  // Cut at word boundary
  const excerpt = text.substring(0, maxLength);
  const lastSpace = excerpt.lastIndexOf(' ');
  
  return excerpt.substring(0, lastSpace) + '...';
}

function parseMarkdownToPost(content, filename) {
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
  const metaDescription = extractPlainTextExcerpt(contentWithoutTitle);
  const readTime = estimateReadTime(contentWithoutTitle);
  
  return {
    id: slug,
    slug,
    title,
    content: contentWithoutTitle,
    excerpt,
    metaDescription,
    date: new Date().toISOString(),
    imageUrl,
    readTime
  };
}

// Generate XML sitemap
function generateXmlSitemap(posts, baseUrl = 'https://randomversegenerator.com') {
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '\\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  
  // Add main pages
  const mainPages = ['', 'about/', 'blog/', 'contact/'];
  for (const page of mainPages) {
    xml += \`
  <url>
    <loc>\${baseUrl}/\${page}</loc>
    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>\${page === '' ? '1.0' : '0.8'}</priority>
  </url>\`;
  }
  
  // Add blog pagination pages
  const postsPerPage = 6;
  const totalPages = Math.ceil(posts.length / postsPerPage);
  
  for (let i = 1; i <= totalPages; i++) {
    if (i > 1) { // Page 1 is already covered by /blog/
      xml += \`
  <url>
    <loc>\${baseUrl}/blog/page/\${i}/</loc>
    <lastmod>\${new Date().toISOString().split('T')[0]}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.7</priority>
  </url>\`;
    }
  }
  
  // Add blog posts
  for (const post of posts) {
    xml += \`
  <url>
    <loc>\${baseUrl}/blog/\${post.slug}/</loc>
    <lastmod>\${post.date.split('T')[0]}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.6</priority>
  </url>\`;
  }
  
  xml += '\\n</urlset>';
  
  return xml;
}

// Generate sitemap index if needed (for large sites)
function generateSitemapIndex(sitemapCount, baseUrl = 'https://randomversegenerator.com') {
  const today = new Date().toISOString().split('T')[0];
  let xml = '<?xml version="1.0" encoding="UTF-8"?>';
  xml += '\\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
  
  for (let i = 1; i <= sitemapCount; i++) {
    xml += \`
  <sitemap>
    <loc>\${baseUrl}/sitemap\${i}.xml</loc>
    <lastmod>\${today}</lastmod>
  </sitemap>\`;
  }
  
  xml += '\\n</sitemapindex>';
  
  return xml;
}

async function extractBlogPosts() {
  console.log('Starting blog post extraction...');
  
  const publicDir = path.resolve(process.cwd(), 'dist');
  const zipPath = path.join(publicDir, 'blog-posts.zip');
  
  // Check if zip exists
  if (!fs.existsSync(zipPath)) {
    console.log('No blog posts zip found, skipping extraction');
    return;
  }
  
  try {
    console.log('Found blog-posts.zip, extracting...');
    
    const zipData = fs.readFileSync(zipPath);
    const zip = await JSZip.loadAsync(zipData);
    const posts = [];
    
    // Process all markdown files
    const markdownFiles = Object.keys(zip.files).filter(filename => 
      filename.endsWith('.md') && !zip.files[filename].dir
    );
    
    console.log(\`Found \${markdownFiles.length} markdown files\`);
    
    for (const filename of markdownFiles) {
      console.log(\`Processing: \${filename}\`);
      const content = await zip.files[filename].async('string');
      const post = parseMarkdownToPost(content, filename);
      posts.push(post);
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Write processed posts to JSON file
    const outputPath = path.join(publicDir, 'blog-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
    
    // Generate XML sitemap
    const MAX_URLS_PER_SITEMAP = 500; // Most search engines recommend fewer than 50,000
    const baseUrl = 'https://randomversegenerator.com';
    
    if (posts.length + 10 <= MAX_URLS_PER_SITEMAP) { // 10 accounts for main pages and pagination
      // Generate a single sitemap
      const sitemap = generateXmlSitemap(posts, baseUrl);
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemap);
      console.log('Generated sitemap.xml');
    } else {
      // Generate multiple sitemaps and an index
      const postsPerSitemap = Math.ceil(posts.length / Math.ceil(posts.length / MAX_URLS_PER_SITEMAP));
      const sitemapCount = Math.ceil(posts.length / postsPerSitemap);
      
      // Create main sitemap (non-blog content)
      const mainSitemap = generateXmlSitemap([], baseUrl);
      fs.writeFileSync(path.join(publicDir, 'sitemap1.xml'), mainSitemap);
      
      // Create post sitemaps
      for (let i = 0; i < sitemapCount; i++) {
        const startIdx = i * postsPerSitemap;
        const endIdx = Math.min((i + 1) * postsPerSitemap, posts.length);
        const sitemapPosts = posts.slice(startIdx, endIdx);
        
        const sitemap = generateXmlSitemap(sitemapPosts, baseUrl);
        fs.writeFileSync(path.join(publicDir, \`sitemap\${i + 2}.xml\`), sitemap);
      }
      
      // Create sitemap index
      const sitemapIndex = generateSitemapIndex(sitemapCount + 1, baseUrl);
      fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), sitemapIndex);
      
      console.log(\`Generated sitemap index with \${sitemapCount + 1} sitemaps\`);
    }
    
    // Generate HTML sitemap
    fs.copyFileSync(
      path.join(publicDir, 'index.html'),
      path.join(publicDir, 'sitemap.html')
    );
    
    console.log(\`Successfully extracted \${posts.length} blog posts to blog-data.json\`);
  } catch (error) {
    console.error('Error extracting blog posts:', error);
  }
}

// Run the function
extractBlogPosts().catch(err => {
  console.error('Fatal error in blog post extraction:', err);
  process.exit(1);
});`;

  // Write the actual implementation to the dist-scripts directory
  await fs.writeFile(
    path.join(distScriptsDir, 'extract-posts.js'),
    actualImplementation,
    'utf-8'
  );
  
  console.log('Build scripts prepared successfully!');
}

prepareBuildScripts().catch(err => {
  console.error('Error preparing build scripts:', err);
  process.exit(1);
});