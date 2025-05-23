import { useState, useEffect } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from 'lucide-react';
import BlogPostCard from '../blog/components/BlogPostCard';
import BlogSearch from '../blog/components/BlogSearch';
import BlogCTA from '../blog/components/BlogCTA';
import Pagination from '../blog/components/Pagination';
import { loadBlogPosts } from '../blog/utils/loadBlogPosts';
import { searchPosts } from '../blog/utils/blogUtils';
import { BlogPost } from '../blog/types';
import { blogConfig } from '../blog/config';
import { Helmet } from 'react-helmet';

export default function Blog() {
  const { page } = useParams<{ page: string }>();
  const location = useLocation();
  const navigate = useNavigate();
  
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  // Parse current page from params or default to 1
  const currentPage = page ? parseInt(page) : 1;
  const postsPerPage = blogConfig.postsPerPage;
  
  // Calculate pagination values
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const startIndex = (currentPage - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  const currentPosts = filteredPosts.slice(startIndex, endIndex);
  
  // Handle URL search params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const term = params.get('search') || '';
    setSearchTerm(term);
  }, [location.search]);
  
  // Load posts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await loadBlogPosts();
        setPosts(loadedPosts);
        
        // Apply search filter if term exists
        if (searchTerm) {
          setFilteredPosts(searchPosts(loadedPosts, searchTerm));
        } else {
          setFilteredPosts(loadedPosts);
        }
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, [searchTerm]);
  
  // Handle search
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    
    // Update URL with search term or remove it if empty
    if (term) {
      navigate(`/blog/?search=${encodeURIComponent(term)}`);
    } else {
      navigate('/blog/');
    }
    
    setFilteredPosts(searchPosts(posts, term));
  };
  
  // Handle page change
  const handlePageChange = (page: number) => {
    // URL update is handled by Link component in Pagination
    window.scrollTo(0, 0);
  };
  
  // Get a featured post (just use the first one in this example)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 0 ? posts.slice(1) : [];
  
  return (
    <>
      <Helmet>
        <title>Bible Verse Blog - Biblical Insights, Devotionals, and Spiritual Guidance</title>
        <meta 
          name="description" 
          content="Explore biblical insights, devotionals, and spiritual guidance for your daily life and spiritual journey." 
        />
        <link rel="canonical" href={`https://randomversegenerator.com${location.pathname}`} />
      </Helmet>
      
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-500 to-purple-600 text-transparent bg-clip-text">
              Bible Verse Blog
            </h1>
            <p className="text-xl text-neutral-600">
              Biblical insights, devotionals, and spiritual guidance
            </p>
          </div>
          
          <BlogSearch onSearch={handleSearch} searchTerm={searchTerm} />
          
          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-500"></div>
            </div>
          ) : (
            <>
              {searchTerm ? (
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-4">
                    Search Results: {filteredPosts.length} {filteredPosts.length === 1 ? 'post' : 'posts'} found
                  </h2>
                  
                  {filteredPosts.length === 0 ? (
                    <Card className="p-8 text-center">
                      <BookOpen className="h-12 w-12 mx-auto text-neutral-300 mb-4" />
                      <h3 className="text-xl font-semibold mb-2">No Posts Found</h3>
                      <p className="text-neutral-600">
                        We couldn't find any posts matching your search term. Please try a different search.
                      </p>
                    </Card>
                  ) : (
                    <>
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentPosts.map(post => (
                          <BlogPostCard key={post.id} post={post} />
                        ))}
                      </div>
                      
                      <Pagination 
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                      />
                    </>
                  )}
                </div>
              ) : (
                <>
                  {!page && featuredPost && (
                    <div className="mb-12">
                      <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
                      <BlogPostCard post={featuredPost} featured={true} />
                    </div>
                  )}
                  
                  <div className="mb-12">
                    <Tabs defaultValue="recent" className="w-full">
                      <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">Latest Articles</h2>
                        <TabsList>
                          <TabsTrigger value="recent">Recent</TabsTrigger>
                          <TabsTrigger value="popular">Popular</TabsTrigger>
                        </TabsList>
                      </div>
                      
                      <TabsContent value="recent" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {currentPosts.map(post => (
                            <BlogPostCard key={post.id} post={post} />
                          ))}
                        </div>
                        
                        <Pagination 
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </TabsContent>
                      
                      <TabsContent value="popular" className="mt-0">
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                          {/* In a real app, these would be sorted by popularity metrics */}
                          {[...regularPosts].reverse().slice(startIndex, endIndex).map(post => (
                            <BlogPostCard key={post.id} post={post} />
                          ))}
                        </div>
                        
                        <Pagination 
                          currentPage={currentPage}
                          totalPages={totalPages}
                          onPageChange={handlePageChange}
                        />
                      </TabsContent>
                    </Tabs>
                  </div>
                </>
              )}
            </>
          )}
          
          <BlogCTA />
        </div>
      </div>
    </>
  );
}