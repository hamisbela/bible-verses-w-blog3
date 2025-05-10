import { Link } from 'react-router-dom';
import { BookOpen, Coffee } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="container mx-auto px-4 py-4">
        <nav className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link to="/" className="flex items-center space-x-2 text-xl font-bold text-neutral-800">
            <BookOpen className="h-6 w-6" />
            <span>RandomVerseGenerator.com</span>
          </Link>
          <div className="flex items-center space-x-4 sm:space-x-6">
            <Link to="/" className="hover:text-neutral-600">Home</Link>
            <Link to="/blog/" className="hover:text-neutral-600">Blog</Link>
            <Link to="/about/" className="hover:text-neutral-600">About</Link>
            <Link to="/contact/" className="hover:text-neutral-600">Contact</Link>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=random-verse-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button size="sm" className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white">
                <Coffee className="h-4 w-4" />
                <span className="hidden sm:inline">Support Us</span>
              </Button>
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}