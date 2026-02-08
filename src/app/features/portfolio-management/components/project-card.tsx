import DeleteDialog from '@/components/ui/delete-dialog';
import type { ProjectStatus } from '@/types/portfolio-management';
import { clsx } from 'clsx';
import { Eye, Heart, MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { twMerge } from 'tailwind-merge';
import type { ProjectData } from '../constants/data';
import ChangeStatusDialog from './change-status-dialog';
import { ProjectActionMenu } from './project-action-menu';
import { SuccessToast } from './success-toast';

const statusColors: Record<ProjectStatus, string> = {
  Planning: 'bg-[#155DFC]',
  Completed: 'bg-[#00B634]',
  'In Progress': 'bg-[#FF9900]',
  Unqualified: 'bg-[#7D7D7D]',
};

const formatCount = (count: number): string => {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}K`;
  }
  return count.toString();
};

interface ProjectCardProps {
  data: ProjectData;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: number, status: ProjectStatus) => void;
}

export const ProjectCard = ({
  data,
  onDelete,
  onStatusChange,
}: ProjectCardProps) => {
  const navigate = useNavigate();
  const {
    id,
    image,
    title,
    leader,
    members,
    status,
    reactCount = 0,
    viewCount = 0,
  } = data;
  const displayMembers = members.slice(0, 3);
  const remainingCount = Math.max(0, members.length - 3);

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showMembersPopover, setShowMembersPopover] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);
  const [statusDialogProjectId, setStatusDialogProjectId] = useState<
    number | null
  >(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
      if (
        popoverRef.current &&
        !popoverRef.current.contains(event.target as Node)
      ) {
        setShowMembersPopover(false);
      }
    };

    if (isMenuOpen || showMembersPopover) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isMenuOpen, showMembersPopover]);

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

  const handleStatusConfirm = (newStatus: ProjectStatus) => {
    if (statusDialogProjectId !== null) {
      onStatusChange?.(statusDialogProjectId, newStatus);
      setStatusDialogProjectId(null);
    }
  };

  const currentProject = { id, status };

  return (
    <>
      <div
        className={twMerge(
          'relative flex w-full flex-col rounded-2xl bg-[#1F2937] p-4 text-white border border-[#374151] hover:shadow-lg transition-shadow',
        )}
      >
        <div className="relative mb-4 w-full aspect-video overflow-hidden rounded-xl border border-[#6B7280]">
          <img src={image} alt={title} className="h-full w-full object-cover" />
        </div>

        <h3 className="mb-4 text-base font-bold leading-tight">{title}</h3>

        <div className="mb-4 space-y-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9CA3AF]">Team Leader</span>
            <span className="font-medium text-white">{leader}</span>
          </div>

          <div className="flex items-center justify-between text-sm">
            <span className="text-[#9CA3AF]">Team Memembers</span>
            <div className="relative flex items-center">
              <div className="flex items-center -space-x-2">
                {displayMembers.map((member, index) => (
                  <Link
                    key={member.id}
                    to={`/profile/${member.name}`}
                    state={{
                      devData: {
                        ...member,
                        profilePictureUrl: member.avatarUrl,
                      },
                    }}
                    className="relative h-7 w-7 overflow-hidden rounded-full border-2 border-[#1F2937] bg-gray-300 block hover:z-50 hover:-translate-y-1 hover:scale-150 transition-all duration-200 ease-out cursor-pointer"
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
              </div>
              {remainingCount > 0 && (
                <div className="relative">
                  <button
                    className="relative z-0 flex items-center justify-center text-sm font-medium ml-1 text-[#9CA3AF] hover:text-white transition-colors cursor-pointer"
                    onClick={() => setShowMembersPopover(!showMembersPopover)}
                  >
                    +{remainingCount}
                  </button>

                  {showMembersPopover && (
                    <div
                      ref={popoverRef}
                      className="absolute bottom-full right-0 mb-2 w-40 bg-[#1F2937] border border-[#374151] rounded-lg shadow-xl z-50 py-2"
                    >
                      {members.map((member) => (
                        <Link
                          key={member.id}
                          to={`/profile/${member.name}`}
                          state={{
                            devData: {
                              ...member,
                              profilePictureUrl: member.avatarUrl,
                            },
                          }}
                          className="flex items-center gap-2 px-3 py-1.5 hover:bg-[#374151] transition-colors"
                        >
                          <div className="h-6 w-6 overflow-hidden rounded-full bg-gray-300 shrink-0">
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
                          </div>
                          <span className="text-sm text-white">
                            {member.name}
                          </span>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between pt-2">
          <span
            className={clsx(
              'inline-flex items-center rounded-full px-4 py-1 text-sm font-medium text-white',
              statusColors[status],
            )}
          >
            {status}
          </span>

          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1 text-[#9CA3AF]">
              <Heart className="w-4 h-4" fill="#9CA3AF" />
              <span className="text-sm">{formatCount(reactCount)}</span>
            </div>

            <div className="flex items-center gap-1 text-[#9CA3AF]">
              <Eye className="w-4 h-4" />
              <span className="text-sm">{formatCount(viewCount)}</span>
            </div>

            <ProjectActionMenu
              ref={menuRef}
              projectId={id}
              isOpen={isMenuOpen}
              onToggle={() => setIsMenuOpen(!isMenuOpen)}
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDeleteClick}
              onStatusChange={(id) => setStatusDialogProjectId(id as number)}
              menuPosition="top-right"
              triggerClassName="flex h-8 w-8 items-center justify-center rounded-full text-[#9CA3AF] hover:bg-white/10 hover:text-white transition-colors"
              triggerIcon={<MoreVertical className="w-5 h-5" />}
            />
          </div>
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

      <ChangeStatusDialog
        isOpen={statusDialogProjectId !== null}
        onClose={() => setStatusDialogProjectId(null)}
        onConfirm={handleStatusConfirm}
        currentStatus={currentProject?.status}
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
