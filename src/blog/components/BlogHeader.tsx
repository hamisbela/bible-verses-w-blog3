import React from 'react';
import { formatDate } from '../utils/blogUtils';
import { BlogPost } from '../types';
import { Clock, Calendar } from 'lucide-react';
import ShareButtons from './ShareButtons';

interface BlogHeaderProps {
  post: BlogPost;
}

const BlogHeader: React.FC<BlogHeaderProps> = ({ post }) => {
  return (
    <div className="mb-8">
      <div className="relative aspect-[21/9] w-full mb-6 rounded-xl overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${post.imageUrl})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
          <div className="absolute bottom-0 left-0 right-0 p-8">
            <h1 className="text-white text-3xl md:text-4xl lg:text-5xl font-bold mb-4">{post.title}</h1>
            <div className="flex flex-wrap items-center gap-4 text-white/90">
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{post.readTime} min read</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center border-b border-neutral-200 pb-4 mb-8">
        <p className="text-neutral-600 italic">
          Share this article
        </p>
        <ShareButtons post={post} />
      </div>
    </div>
  );
};

export default BlogHeader;