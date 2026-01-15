import { COLORS } from '@/constants/colors';
import { Button } from '@radix-ui/themes';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import type { PaginationType } from '../types/idea-management.types';

const Pagination = ({
  currentPage,
  totalPages,
  onPageChange,
}: PaginationType) => {
  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      // Show all pages if total is 5 or less
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      // Show first, last, current and nearby pages with ellipsis
      if (currentPage <= 3) {
        pages.push(1, 2, 3, 4, '...', totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(
          1,
          '...',
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(
          1,
          '...',
          currentPage - 1,
          currentPage,
          currentPage + 1,
          '...',
          totalPages,
        );
      }
    }

    return pages.map((page, index) => {
      if (page === '...') {
        return (
          <span
            key={`ellipsis-${index}`}
            className="text-white px-2 flex items-center font-semibold"
          >
            ...
          </span>
        );
      }

      const isActive = page === currentPage;
      return (
        <Button
          key={page}
          size="3"
          variant="soft"
          style={
            isActive
              ? {
                  background: COLORS.primary,
                  color: 'white',
                  cursor: 'pointer',
                }
              : {
                  background: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                  cursor: 'pointer',
                }
          }
          onClick={() => onPageChange(Number(page))}
        >
          {page}
        </Button>
      );
    });
  };

  return (
    <div className="flex items-center justify-center mt-8 gap-4 text-white">
      <Button
        size="3"
        variant="soft"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: '1px solid white',
          cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
          opacity: currentPage === 1 ? 0.5 : 1,
        }}
        onClick={() => currentPage > 1 && onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
      >
        <ChevronLeft />
      </Button>

      {renderPageNumbers()}

      <Button
        size="3"
        variant="soft"
        style={{
          background: 'rgba(255, 255, 255, 0.1)',
          color: 'white',
          border: '1px solid white',
          cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
          opacity: currentPage === totalPages ? 0.5 : 1,
        }}
        onClick={() =>
          currentPage < totalPages && onPageChange(currentPage + 1)
        }
        disabled={currentPage === totalPages}
      >
        <ChevronRight />
      </Button>
    </div>
  );
};

export default Pagination;
