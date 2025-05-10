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
  const readTime = estimateReadTime(contentWithoutTitle);
  
  return {
    id: slug,
    slug,
    title,
    content: contentWithoutTitle,
    excerpt,
    date: new Date().toISOString(),
    imageUrl,
    readTime
  };
}

async function extractBlogPosts() {
  console.log('Starting blog post extraction...');
  
  // Using __dirname and path.resolve for ES modules compatibility
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