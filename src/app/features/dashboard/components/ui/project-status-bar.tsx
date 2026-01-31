import { cn } from '@/lib/utils';

type ProjectStatusBarProps = {
  title: string;
  date: string;
  onClick?: () => void;
  className?: string;
};

function ProjectStatusBar({
  title,
  date,
  onClick,
  className,
}: ProjectStatusBarProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'flex items-center gap-x-6 justify-between p-2 text-sm text-white',
        'rounded-md cursor-pointer',
        'transition-colors duration-200',
        'hover:bg-white/5 hover:text-white',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-custom',
        className,
      )}
    >
      <p className="line-clamp-2 text-wrap">{title}</p>
      <p className="whitespace-nowrap">{date}</p>
    </div>
  );
}

export default ProjectStatusBar;
