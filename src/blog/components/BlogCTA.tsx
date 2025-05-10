import React from 'react';
import { Button } from "@/components/ui/button";
import { ArrowRight } from 'lucide-react';
import { blogConfig } from '../config';
import { Link } from 'react-router-dom';

const BlogCTA: React.FC = () => {
  const { cta } = blogConfig;
  
  return (
    <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-8 mb-12">
      <div className="flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex-1 space-y-4">
          <h2 className="text-2xl font-bold">{cta.title}</h2>
          <p className="text-neutral-600">{cta.description}</p>
        </div>
        <Link to={cta.buttonUrl}>
          <Button size="lg" className="bg-purple-500 hover:bg-purple-600 text-white whitespace-nowrap">
            {cta.buttonText}
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default BlogCTA;