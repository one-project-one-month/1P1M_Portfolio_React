import type { ReactNode } from 'react';

interface ProjectSectionProps {
  title: string;
  children: ReactNode;
  isEmpty?: boolean;
  emptyMessage?: string;
}

export const ProjectSection = ({
  title,
  children,
  isEmpty = false,
  emptyMessage = 'No items found',
}: ProjectSectionProps) => {
  return (
    <div className="space-y-6">
      <h2 className="font-extrabold text-4xl text-white">{title}</h2>
      {isEmpty ? (
        <p className="text-slate-400">{emptyMessage}</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr gap-y-8 gap-x-4 md:gap-x-8 lg:gap-x-12">
          {children}
        </div>
      )}
    </div>
  );
};
