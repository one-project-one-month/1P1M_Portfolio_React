import { Button } from '@/components/ui/button';

type Props = {
  currentPage: number;
  totalPages: number;
  hasNext: boolean;
  hasPrevious: boolean;
  onPageChange: (page: number) => void;
};

export default function Pagination({
  currentPage,
  totalPages,
  hasNext,
  hasPrevious,
  onPageChange,
}: Props) {
  return (
    <div className="flex justify-center items-center gap-2 mt-10">
      <Button
        disabled={!hasPrevious}
        onClick={() => onPageChange(currentPage - 1)}
      >
        Prev
      </Button>

      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'primary' : 'secondary'}
          onClick={() => onPageChange(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        disabled={!hasNext}
        onClick={() => onPageChange(currentPage + 1)}
      >
        Next
      </Button>
    </div>
  );
}