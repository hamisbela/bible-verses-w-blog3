import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from 'lucide-react';
import BlogHeader from '../blog/components/BlogHeader';
import BlogContent from '../blog/components/BlogContent';
import BlogFooter from '../blog/components/BlogFooter';
import BlogSidebar from '../blog/components/BlogSidebar';
import { loadBlogPosts } from '../blog/utils/loadBlogPosts';
import { getRelatedPosts } from '../blog/utils/blogUtils';
import { BlogPost } from '../blog/types';
import { blogConfig } from '../blog/config';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  const [post, setPost] = useState<BlogPost | null>(null);
  const [allPosts, setAllPosts] = useState<BlogPost[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      try {
        const loadedPosts = await loadBlogPosts();
        setAllPosts(loadedPosts);
        
        const foundPost = loadedPosts.find(p => p.slug === slug);
        setPost(foundPost || null);
        
        if (foundPost) {
          const related = getRelatedPosts(
            foundPost, 
            loadedPosts, 
            blogConfig.relatedPostsCount
          );
          setRelatedPosts(related);
        }
      } catch (error) {
        console.error('Error loading blog post:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [slug]);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (term) {
      navigate(`/blog?search=${encodeURIComponent(term)}`);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
        </div>
      </div>
    );
  }
  
  if (!post) {
    return (
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-3xl font-bold mb-4">Post Not Found</h1>
          <p className="text-neutral-600 mb-8">
            The blog post you're looking for doesn't exist or has been removed.
          </p>
          <Link to="/blog">
            <Button 
              variant="outline" 
              className="px-6 py-2 border-2 border-purple-500 text-purple-600 hover:bg-purple-50"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Button>
          </Link>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="flex flex-col lg:flex-row gap-12">
        <div className="flex-1">
          <Link to="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
            <ArrowLeft className="mr-2 h-4 w-4" />
            <span>Back to Blog</span>
          </Link>
          
          <BlogHeader post={post} />
          <BlogContent post={post} />
          <BlogFooter post={post} relatedPosts={relatedPosts} />
        </div>
        
        <div className="w-full lg:w-80 shrink-0">
          <div className="sticky top-8">
            <BlogSidebar onSearch={handleSearch} searchTerm={searchTerm} />
          </div>
        </div>
      </div>
    </div>
  );
}