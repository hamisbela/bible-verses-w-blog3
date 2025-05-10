#!/usr/bin/env node

/**
 * Blog Post Extractor
 * 
 * This script extracts blog posts from a zip file during the Netlify build process.
 * It's designed to be run as part of the build step to generate blog content dynamically.
 * 
 * How it works:
 * 1. Looks for a blog-posts.zip file in the public directory
 * 2. Extracts all markdown files
 * 3. Processes them into blog post objects
 * 4. Saves the processed posts as a JSON file for the frontend to consume
 */

// Note: This is a Node.js script that would be executed during the build process
// For it to work in production, you'd need to:
// 1. Add "fs-extra" and "jszip" as dependencies
// 2. Add a build command in netlify.toml or package.json that runs this script

/*
// Example netlify.toml configuration:

[build]
  command = "npm run build && node src/blog/extract-posts.js"
  publish = "dist"

// Example implementation:

const fs = require('fs-extra');
const path = require('path');
const JSZip = require('jszip');

// Import utilities (these would need to be converted to CommonJS format)
// Or you could use a separate utilities file specifically for the build script
function slugify(text) {
  return text
    .toString()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, '-')
    .replace(/[^\w-]+/g, '')
    .replace(/--+/g, '-');
}

function getRandomFeatureImage() {
  const images = [
    'https://images.pexels.com/photos/267076/pexels-photo-267076.jpeg',
    'https://images.pexels.com/photos/6942034/pexels-photo-6942034.jpeg',
    'https://images.pexels.com/photos/5077047/pexels-photo-5077047.jpeg',
    'https://images.pexels.com/photos/7942529/pexels-photo-7942529.jpeg',
    'https://images.pexels.com/photos/1112048/pexels-photo-1112048.jpeg',
    'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg',
    'https://images.pexels.com/photos/5712440/pexels-photo-5712440.jpeg',
  ];
  return images[Math.floor(Math.random() * images.length)];
}

function estimateReadTime(content) {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
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
  
  const publicDir = path.join(process.cwd(), 'dist');
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
    
    console.log(`Found ${markdownFiles.length} markdown files`);
    
    for (const filename of markdownFiles) {
      console.log(`Processing: ${filename}`);
      const content = await zip.files[filename].async('string');
      const post = parseMarkdownToPost(content, filename);
      posts.push(post);
    }
    
    // Sort posts by date (newest first)
    posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    // Write processed posts to JSON file
    const outputPath = path.join(publicDir, 'blog-data.json');
    fs.writeFileSync(outputPath, JSON.stringify(posts, null, 2));
    
    console.log(`Successfully extracted ${posts.length} blog posts to blog-data.json`);
  } catch (error) {
    console.error('Error extracting blog posts:', error);
  }
}

extractBlogPosts().catch(err => {
  console.error('Fatal error in blog post extraction:', err);
  process.exit(1);
});
*/

// Note: This script is a template that needs to be implemented with proper dependencies
// in a real production environment. The actual implementation would require Node.js
// modules that handle file system operations and zip file extraction.