import React from 'react';
import { Button } from "@/components/ui/button";
import { Twitter, Facebook, Linkedin, Share2 } from 'lucide-react';
import { BlogPost } from '../types';

interface ShareButtonsProps {
  post: BlogPost;
}

const ShareButtons: React.FC<ShareButtonsProps> = ({ post }) => {
  // Get the current URL
  const currentUrl = window.location.href;
  const postTitle = encodeURIComponent(post.title);
  
  const shareLinks = {
    twitter: `https://twitter.com/intent/tweet?text=${postTitle}&url=${encodeURIComponent(currentUrl)}`,
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`,
    linkedin: `https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}&title=${postTitle}`
  };
  
  return (
    <div className="flex items-center space-x-2">
      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer" aria-label="Share on Twitter">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 h-9 p-0 rounded-full"
        >
          <Twitter className="h-4 w-4 text-neutral-600" />
        </Button>
      </a>
      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer" aria-label="Share on Facebook">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 h-9 p-0 rounded-full"
        >
          <Facebook className="h-4 w-4 text-neutral-600" />
        </Button>
      </a>
      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer" aria-label="Share on LinkedIn">
        <Button 
          variant="outline" 
          size="sm" 
          className="w-9 h-9 p-0 rounded-full"
        >
          <Linkedin className="h-4 w-4 text-neutral-600" />
        </Button>
      </a>
      <Button 
        variant="outline" 
        size="sm" 
        className="w-9 h-9 p-0 rounded-full"
        onClick={() => {
          if (navigator.share) {
            navigator.share({
              title: post.title,
              text: post.excerpt,
              url: currentUrl
            });
          }
        }}
      >
        <Share2 className="h-4 w-4 text-neutral-600" />
      </Button>
    </div>
  );
};

export default ShareButtons;