import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import ShareButtons from './ShareButtons';
import RelatedPosts from './RelatedPosts';
import { ArrowRight } from 'lucide-react';
import { BlogPost } from '../types';
import { blogConfig } from '../config';
import { Link } from 'react-router-dom';

interface BlogFooterProps {
  post: BlogPost;
  relatedPosts: BlogPost[];
}

const BlogFooter: React.FC<BlogFooterProps> = ({ post, relatedPosts }) => {
  return (
    <div className="space-y-12 mt-12 pt-8 border-t border-neutral-200">
      {/* Share Section */}
      <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
        <p className="text-neutral-600 font-medium">
          Did you find this article helpful? Share it:
        </p>
        <ShareButtons post={post} />
      </div>
      
      {/* CTA Section */}
      <Card className="p-8 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="flex-1 space-y-4">
            <h3 className="text-2xl font-bold">{blogConfig.cta.title}</h3>
            <p className="text-neutral-600">{blogConfig.cta.description}</p>
            <Link to={`${blogConfig.cta.buttonUrl}/`}>
              <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white">
                {blogConfig.cta.buttonText}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </div>
          <div className="hidden md:flex justify-center items-center w-32 h-32 bg-white rounded-full shadow-md">
            <blogConfig.cta.icon className="h-16 w-16 text-purple-500" />
          </div>
        </div>
      </Card>
      
      {/* Related Posts Section */}
      <div>
        <h2 className="text-2xl font-bold mb-6">Related Articles</h2>
        <RelatedPosts posts={relatedPosts} />
      </div>
    </div>
  );
};

export default BlogFooter;