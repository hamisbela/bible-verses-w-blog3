import { useState, useEffect } from 'react';
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BookOpen } from 'lucide-react';
import BlogPostCard from '../blog/components/BlogPostCard';
import BlogSearch from '../blog/components/BlogSearch';
import BlogCTA from '../blog/components/BlogCTA';
import { loadBlogPosts } from '../blog/utils/loadBlogPosts';
import { searchPosts } from '../blog/utils/blogUtils';
import { BlogPost } from '../blog/types';

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const loadedPosts = await loadBlogPosts();
        setPosts(loadedPosts);
        setFilteredPosts(loadedPosts);
      } catch (error) {
        console.error('Error loading blog posts:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPosts();
  }, []);
  
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setFilteredPosts(searchPosts(posts, term));
  };
  
  // Get a featured post (just use the first one in this example)
  const featuredPost = posts.length > 0 ? posts[0] : null;
  const regularPosts = posts.length > 0 ? posts.slice(1) : [];
  
  return (
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
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredPosts.map(post => (
                      <BlogPostCard key={post.id} post={post} />
                    ))}
                  </div>
                )}
              </div>
            ) : (
              <>
                {featuredPost && (
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
                        {regularPosts.map(post => (
                          <BlogPostCard key={post.id} post={post} />
                        ))}
                      </div>
                    </TabsContent>
                    
                    <TabsContent value="popular" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {/* In a real app, these would be sorted by popularity metrics */}
                        {[...regularPosts].reverse().map(post => (
                          <BlogPostCard key={post.id} post={post} />
                        ))}
                      </div>
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
  );
}