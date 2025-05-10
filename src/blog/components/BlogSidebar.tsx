import React from 'react';
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Search, ArrowRight } from 'lucide-react';
import { Input } from "@/components/ui/input";
import { blogConfig } from '../config';
import { Link } from 'react-router-dom';

interface BlogSidebarProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const BlogSidebar: React.FC<BlogSidebarProps> = ({ onSearch, searchTerm }) => {
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="space-y-8">
      {/* Search Widget */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Search</h3>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search posts..."
            className="pl-10"
            value={searchTerm}
            onChange={handleSearchChange}
          />
        </div>
      </Card>
      
      {/* CTA Widget */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center">
            <blogConfig.cta.icon className="h-8 w-8 text-purple-500" />
          </div>
          <h3 className="text-xl font-semibold">{blogConfig.cta.title}</h3>
          <p className="text-neutral-600">{blogConfig.cta.description}</p>
          <Link to={blogConfig.cta.buttonUrl}>
            <Button className="bg-purple-500 hover:bg-purple-600 text-white">
              {blogConfig.cta.buttonText}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>
      </Card>
      
      {/* About Widget */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">About Our Blog</h3>
        <p className="text-neutral-600 mb-4">
          Discover insights, devotionals, and spiritual guidance through our blog posts. 
          We offer biblical wisdom for your daily life and spiritual journey.
        </p>
        <Link to="/about">
          <Button variant="outline" size="sm" className="w-full">
            Learn More
          </Button>
        </Link>
      </Card>
    </div>
  );
};

export default BlogSidebar;