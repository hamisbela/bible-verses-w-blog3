import React from 'react';
import { Button } from "@/components/ui/button";
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange?: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ 
  currentPage, 
  totalPages,
  onPageChange
}) => {
  // Handle page number display logic
  const getPageNumbers = () => {
    const pages = [];
    
    // Always display first page
    pages.push(1);
    
    // Calculate range to display
    let rangeStart = Math.max(2, currentPage - 1);
    let rangeEnd = Math.min(totalPages - 1, currentPage + 1);
    
    // Show ellipsis if needed before range
    if (rangeStart > 2) {
      pages.push('ellipsis-start');
    }
    
    // Add pages in the middle range
    for (let i = rangeStart; i <= rangeEnd; i++) {
      pages.push(i);
    }
    
    // Show ellipsis if needed after range
    if (rangeEnd < totalPages - 1) {
      pages.push('ellipsis-end');
    }
    
    // Always display last page if there's more than one page
    if (totalPages > 1) {
      pages.push(totalPages);
    }
    
    return pages;
  };
  
  const handlePageClick = (page: number) => {
    if (onPageChange) {
      onPageChange(page);
    }
  };
  
  // Don't show pagination if there's only one page
  if (totalPages <= 1) {
    return null;
  }
  
  const pageNumbers = getPageNumbers();
  
  return (
    <nav className="flex justify-center my-8" aria-label="Pagination">
      <div className="flex flex-wrap items-center gap-2">
        {/* Previous button */}
        {currentPage > 1 ? (
          <Link to={`/blog/page/${currentPage - 1}/`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handlePageClick(currentPage - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
              <span>Previous</span>
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 opacity-50 cursor-not-allowed"
            disabled
          >
            <ChevronLeft className="h-4 w-4" />
            <span>Previous</span>
          </Button>
        )}
        
        {/* Page numbers */}
        {pageNumbers.map((page, i) => {
          if (page === 'ellipsis-start' || page === 'ellipsis-end') {
            return (
              <span key={`ellipsis-${i}`} className="px-2">
                &hellip;
              </span>
            );
          }
          
          const pageNum = page as number;
          const isCurrentPage = pageNum === currentPage;
          
          return (
            <Link key={pageNum} to={`/blog/page/${pageNum}/`}>
              <Button
                variant={isCurrentPage ? "default" : "outline"}
                size="sm"
                className={`
                  min-w-9 h-9 ${isCurrentPage ? 'bg-purple-500 hover:bg-purple-600' : ''}
                `}
                onClick={() => handlePageClick(pageNum)}
              >
                {pageNum}
              </Button>
            </Link>
          );
        })}
        
        {/* Next button */}
        {currentPage < totalPages ? (
          <Link to={`/blog/page/${currentPage + 1}/`}>
            <Button
              variant="outline"
              size="sm"
              className="flex items-center gap-1"
              onClick={() => handlePageClick(currentPage + 1)}
            >
              <span>Next</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </Link>
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="flex items-center gap-1 opacity-50 cursor-not-allowed"
            disabled
          >
            <span>Next</span>
            <ChevronRight className="h-4 w-4" />
          </Button>
        )}
      </div>
    </nav>
  );
};

export default Pagination;