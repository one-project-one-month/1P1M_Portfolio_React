import DeleteDialog from '@/components/ui/delete-dialog';
import type {
  ProjectCardProps,
  ProjectStatus,
} from '@/types/portfolio-management';
import { clsx } from 'clsx';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import { ProjectActionMenu } from './project-action-menu';
import { SuccessToast } from './success-toast';

const statusColors: Record<ProjectStatus, string> = {
  Completed: 'bg-[#00B634]',
  'In-Progress': 'bg-[#FF9900]',
  Unqualified: 'bg-[#7D7D7D]',
};

interface ExtendedProjectCardProps extends ProjectCardProps {
  onDelete?: (id: string) => void;
}

export const ProjectCard = ({
  id,
  image,
  title,
  teamLeader,
  members,
  status,
  className,
  onDelete,
}: ExtendedProjectCardProps) => {
  const navigate = useNavigate();
  const displayMembers = members.slice(0, 3);
  const remainingCount = Math.max(0, members.length - 3);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen]);

  // Auto-hide toast after 3 seconds
  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  const handleView = () => {
    navigate(`/admin/portfolio-management/view-project-portfolio/${id}`);
    setIsMenuOpen(false);
  };

  const handleEdit = () => {
    navigate(`/admin/portfolio-management/edit-portfolio/${id}`);
    setIsMenuOpen(false);
  };

  const handleDeleteClick = (projectId: string | number) => {
    setDeleteProjectId(projectId.toString());
    setIsMenuOpen(false);
  };

  const handleConfirmDelete = () => {
    if (deleteProjectId) {
      onDelete?.(deleteProjectId);
      setDeleteProjectId(null);
      setShowSuccessToast(true);
    }
  };

  return (
    <>
      <div
        className={twMerge(
          'relative flex w-full flex-col rounded-[10px] bg-[#9C39FC] p-3 text-white hover:shadow-lg transition-shadow',
          className,
        )}
      >
        <div className="relative mb-4 w-full overflow-hidden rounded-lg">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>
        <h3 className="mb-4 text-sm font-bold leading-tight">{title}</h3>
        <div className="mb-4 space-y-2">
          <div className="flex items-center justify-between text-xs leading-5">
            <span className="text-[#D1D5DC]">Team Leader</span>
            <span className="font-medium">{teamLeader}</span>
          </div>
          <div className="flex items-center justify-between text-xs">
            <span className="text-white/70">Team Members</span>
            <div className="flex items-center -space-x-2">
              {displayMembers.map((member, index) => (
                <Link
                  key={member.id}
                  to={`/profile/${member.name}`}
                  state={{
                    devData: { ...member, profilePictureUrl: member.avatarUrl },
                  }}
                  className="relative h-8 w-8 overflow-hidden rounded-full border-2 border-black bg-gray-300 block hover:z-50 hover:scale-110 transition-transform cursor-pointer"
                  style={{ zIndex: displayMembers.length - index }}
                >
                  {member.avatarUrl ? (
                    <img
                      src={member.avatarUrl}
                      alt={member.name}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="flex h-full w-full items-center justify-center bg-gray-400 text-[10px] font-bold">
                      {member.name.charAt(0)}
                    </div>
                  )}
                </Link>
              ))}
              {remainingCount > 0 && (
                <div className="relative z-0 flex items-center justify-center text-xs font-normal ml-2 text-[#A4F4CF] leading-5">
                  +{remainingCount}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between">
          <span
            className={clsx(
              'inline-flex items-center rounded-md px-4 py-0.5 text-sm font-medium text-white',
              statusColors[status],
            )}
          >
            {status}
          </span>

          <ProjectActionMenu
            ref={menuRef}
            projectId={id}
            isOpen={isMenuOpen}
            onToggle={() => setIsMenuOpen(!isMenuOpen)}
            onView={handleView}
            onEdit={handleEdit}
            onDelete={handleDeleteClick}
            menuPosition="left"
            triggerClassName="flex h-8 w-8 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white transition-colors"
          />
        </div>
      </div>

      <DeleteDialog
        isOpen={!!deleteProjectId}
        onClose={() => setDeleteProjectId(null)}
        onConfirm={handleConfirmDelete}
        overlayClassName="bg-black/30 backdrop-blur-[1px] p-10"
        title="Delete Project Portfolio?"
        description={
          <>
            Are you sure you want to delete this{' '}
            <span className="font-semibold">(Project Portfolio)</span>? This
            action cannot be undone.
          </>
        }
      />

      {showSuccessToast && (
        <SuccessToast
          message="Project Portfolio deleted successfully!"
          onClose={() => setShowSuccessToast(false)}
        />
      )}
    </>
  );
};
