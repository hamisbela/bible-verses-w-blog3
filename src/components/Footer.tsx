import { Link } from 'react-router-dom';
import { Coffee, BookOpen } from 'lucide-react';
import { Button } from "@/components/ui/button";

export default function Footer() {
  const currentYear: number = new Date().getFullYear();

  return (
    <footer className="bg-neutral-900 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-semibold mb-3">Quick Links</h3>
            <div className="space-y-2">
              <Link to="/" className="block hover:text-neutral-300">Home</Link>
              <Link to="/blog" className="block hover:text-neutral-300">Blog</Link>
              <Link to="/about" className="block hover:text-neutral-300">About</Link>
              <Link to="/contact" className="block hover:text-neutral-300">Contact</Link>
            </div>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Connect</h3>
            <p className="text-sm text-neutral-300">
              Stay inspired with daily verses and spiritual insights.
            </p>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Support Us</h3>
            <p className="text-sm text-neutral-300 mb-3">
              Help us keep our Bible verse generator free and spreading God's word worldwide.
            </p>
            <a
              href="https://roihacks.gumroad.com/l/dselxe?utm_campaign=donation-home-page&utm_medium=website&utm_source=random-verse-generator"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button 
                variant="outline" 
                size="sm" 
                className="flex items-center gap-2 bg-purple-500 hover:bg-purple-600 text-white border-0"
              >
                <Coffee className="h-4 w-4" />
                <span>Support Our Work</span>
              </Button>
            </a>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Blog</h3>
            <p className="text-sm text-neutral-300">
              Explore our blog for biblical insights, devotionals, and spiritual guidance for your daily walk.
            </p>
            <Link to="/blog" className="block mt-2 text-sm text-purple-300 hover:text-purple-200">
              Read Our Latest Articles →
            </Link>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-neutral-700 text-center text-sm text-neutral-400">
          © {currentYear} RandomVerseGenerator.com. All rights reserved.
        </div>
      </div>
    </footer>
  );
}