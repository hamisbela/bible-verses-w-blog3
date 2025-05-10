import React, { useState } from 'react';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, X } from 'lucide-react';

interface BlogSearchProps {
  onSearch: (term: string) => void;
  searchTerm: string;
}

const BlogSearch: React.FC<BlogSearchProps> = ({ onSearch, searchTerm }) => {
  const [inputValue, setInputValue] = useState(searchTerm);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(inputValue);
  };
  
  const handleClear = () => {
    setInputValue('');
    onSearch('');
  };
  
  return (
    <form onSubmit={handleSubmit} className="w-full max-w-lg mx-auto mb-12">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-neutral-400" />
        <Input
          type="text"
          placeholder="Search blog posts..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          className="pl-10 pr-14 py-6 text-lg rounded-full border-2 focus:border-purple-300"
        />
        {inputValue && (
          <button
            type="button"
            onClick={handleClear}
            className="absolute right-14 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-neutral-700"
          >
            <X className="h-5 w-5" />
          </button>
        )}
        <Button 
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 rounded-full bg-purple-500 hover:bg-purple-600"
        >
          <Search className="h-5 w-5" />
        </Button>
      </div>
    </form>
  );
};

export default BlogSearch;