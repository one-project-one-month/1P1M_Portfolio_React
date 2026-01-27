import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { forwardRef } from 'react';

const actionButtonClass =
  'text-xs text-[#F9FAFB] hover:text-[#9C39FC] transition-colors w-full rounded-none py-1 px-2 !bg-transparent !h-auto justify-center font-normal shadow-none border-none';

const hrClass = 'border-t border-zinc-700 my-1';

interface ProjectActionMenuProps {
  projectId: number | string;
  isOpen: boolean;
  onToggle: () => void;
  onView?: (id: number | string) => void;
  onEdit?: (id: number | string) => void;
  onDelete?: (id: number | string) => void;
  onStatusChange?: (id: number | string, status: string) => void;
  menuPosition?:
    | 'bottom-right'
    | 'bottom-left'
    | 'top-right'
    | 'top-left'
    | 'left-start'
    | 'right-start';
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
      onStatusChange,
      menuPosition = 'bottom-right',
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

    const handleStatusClick = (id: number | string) => {
      onStatusChange?.(id, 'In Progress');
    };

    const getMenuPositionClass = (position: string) => {
      switch (position) {
        case 'bottom-right':
          return 'right-0 top-full mt-2';
        case 'bottom-left':
          return 'left-0 top-full mt-2';
        case 'top-right':
          return 'right-0 bottom-full mb-2 origin-bottom-right';
        case 'top-left':
          return 'left-0 bottom-full mb-2 origin-bottom-left';
        case 'left-start':
          return 'right-full top-0 mr-2 origin-top-right';
        case 'right-start':
          return 'left-full top-0 ml-2 origin-top-left';
        default:
          return 'right-0 top-full mt-2';
      }
    };

    const menuPositionClass = getMenuPositionClass(menuPosition);

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
            className={`absolute ${menuPositionClass} w-40 bg-[#101828] border-[0.5px] shadow-sm border-[#6A7282] rounded-sm z-50 overflow-hidden flex flex-col p-1 text-center`}
          >
            <Button className={actionButtonClass} onClick={handleEdit}>
              Edit Portfolio
            </Button>
            <hr className={hrClass} />
            <Button className={actionButtonClass} onClick={handleView}>
              View Detail
            </Button>
            <hr className={hrClass} />
            <Button className={actionButtonClass} onClick={handleDelete}>
              Delete Portfolio
            </Button>
            <hr className={hrClass} />
            <Button
              className={actionButtonClass}
              onClick={() => handleStatusClick(projectId)}
            >
              Change Status
            </Button>
          </div>
        )}
      </div>
    );
  },
);

ProjectActionMenu.displayName = 'ProjectActionMenu';
