import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { forwardRef } from 'react';

const actionButtonClass =
  'text-xs text-[#F9FAFB] hover:text-[#9C39FC] transition-colors w-full rounded-none py-1 px-2 !bg-transparent !h-auto justify-center font-normal shadow-none border-none';

interface ProjectActionMenuProps {
  projectId: number | string;
  isOpen: boolean;
  onToggle: () => void;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  menuPosition?: 'right' | 'left';
  triggerClassName?: string;
}

export const ProjectActionMenu = forwardRef<
  HTMLDivElement,
  ProjectActionMenuProps
>(
  (
    {
      projectId,
      isOpen,
      onToggle,
      onView,
      onEdit,
      onDelete,
      menuPosition = 'right',
      triggerClassName = 'p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white',
    },
    ref,
  ) => {
    const handleView = () => {
      onView?.(projectId);
    };

    const handleEdit = () => {
      onEdit?.(projectId);
    };

    const handleDelete = () => {
      onDelete?.(projectId);
    };

    const menuPositionClass =
      menuPosition === 'right' ? 'right-8 top-8' : 'right-0 top-full mt-2';

    return (
      <div className="flex items-center justify-center relative">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={triggerClassName}
        >
          <MoreHorizontal className="w-5 h-5" color="white" />
        </button>

        {isOpen && (
          <div
            ref={ref}
            className={`absolute ${menuPositionClass} w-16 bg-[#101828] border-[0.5px] shadow-sm border-[#6A7282] rounded-sm z-50 overflow-hidden flex flex-col p-1 text-center`}
          >
            <Button className={actionButtonClass} onClick={handleView}>
              View
            </Button>
            <Button className={actionButtonClass} onClick={handleEdit}>
              Edit
            </Button>
            <Button className={actionButtonClass} onClick={handleDelete}>
              Delete
            </Button>
          </div>
        )}
      </div>
    );
  },
);

ProjectActionMenu.displayName = 'ProjectActionMenu';
