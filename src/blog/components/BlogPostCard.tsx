import React from 'react';
import { Link } from 'react-router-dom';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Clock, Calendar } from 'lucide-react';
import { BlogPost } from '../types';
import { formatDate } from '../utils/blogUtils';

interface BlogPostCardProps {
  post: BlogPost;
  featured?: boolean;
}

const BlogPostCard: React.FC<BlogPostCardProps> = ({ post, featured = false }) => {
  // Function to render text with markdown bold formatting
  const renderWithBoldFormatting = (text: string) => {
    return text.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
  };

  return (
    <Card className={`overflow-hidden hover:shadow-lg transition-all duration-300 h-full flex flex-col ${featured ? 'border-2 border-purple-200' : 'border'}`}>
      <Link to={`/blog/${post.slug}/`}>
        <div className="relative aspect-video w-full overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center transform hover:scale-105 transition-transform duration-500"
            style={{ backgroundImage: `url(${post.imageUrl})` }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
            {featured && (
              <div className="absolute top-4 left-4 bg-purple-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                Featured
              </div>
            )}
            <h3 className="absolute bottom-4 left-4 right-4 text-white text-lg md:text-xl font-bold line-clamp-2">
              {post.title}
            </h3>
          </div>
        </div>
      </Link>
      
      <div className="p-4 flex-1 flex flex-col">
        <div className="flex items-center text-sm text-neutral-500 gap-4 mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.date)}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-4 w-4" />
            <span>{post.readTime} min read</span>
          </div>
        </div>
        
        <p 
          className="text-neutral-600 mb-4 flex-1 line-clamp-3"
          dangerouslySetInnerHTML={{ __html: renderWithBoldFormatting(post.excerpt) }}
        ></p>
        
        <Link to={`/blog/${post.slug}/`} className="mt-auto">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50 p-0"
          >
            Read more →
          </Button>
        </Link>
      </div>
    </Card>
  );
};

export default BlogPostCard;