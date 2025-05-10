import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { loadBlogPosts } from '../blog/utils/loadBlogPosts';
import { BlogPost } from '../blog/types';

export default function SitemapPage() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await loadBlogPosts();
        setPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading blog posts for sitemap:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  // Main site pages
  const mainPages = [
    { url: '/', title: 'Home - Random Bible Verse Generator' },
    { url: '/blog/', title: 'Blog - Biblical Insights and Devotionals' },
    { url: '/about/', title: 'About Us - Random Bible Verse Generator' },
    { url: '/contact/', title: 'Contact Us - Random Bible Verse Generator' },
  ];
  
  return (
    <>
      <Helmet>
        <title>Sitemap - Random Bible Verse Generator</title>
        <meta name="description" content="Complete site map of RandomVerseGenerator.com - Find all our pages and blog articles in one place." />
        <link rel="canonical" href="https://randomversegenerator.com/sitemap.html" />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8 text-neutral-800">Site Map</h1>
          
          <div className="mb-12">
            <h2 className="text-xl font-semibold mb-4 text-neutral-700">Main Pages</h2>
            <ul className="space-y-2">
              {mainPages.map((page) => (
                <li key={page.url} className="border-b border-neutral-100 pb-2">
                  <Link to={page.url} className="text-purple-600 hover:text-purple-800">
                    {page.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          
          <div>
            <h2 className="text-xl font-semibold mb-4 text-neutral-700">Blog Posts</h2>
            
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
              </div>
            ) : (
              <ul className="space-y-2">
                {posts.map((post) => (
                  <li key={post.id} className="border-b border-neutral-100 pb-2">
                    <Link 
                      to={`/blog/${post.slug}/`} 
                      className="text-purple-600 hover:text-purple-800"
                    >
                      {post.title}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </>
  );
}