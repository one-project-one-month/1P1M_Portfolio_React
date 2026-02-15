import { cn } from '@/lib/utils';
import { ChevronLeft } from 'lucide-react';

type BackButtonProps = {
  label?: string;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
};

function BackButton({
  label = 'Back',
  onClick,
  className,
  disabled = false,
}: BackButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={cn(
        'flex items-center gap-x-2 text-white transition hover:opacity-80 disabled:opacity-50',
        className,
      )}
    >
      <ChevronLeft className="w-4 h-4" />
      <span>{label}</span>
    </button>
  );
}

export default BackButton;
