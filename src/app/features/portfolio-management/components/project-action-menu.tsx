import { Button } from '@/components/ui/button';
import { MoreHorizontal } from 'lucide-react';
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

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
  triggerIcon?: React.ReactNode;
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
      onStatusChange,
      menuPosition = 'bottom-right',
      triggerClassName = 'p-1 hover:bg-white/10 rounded-full transition-colors text-white/70 hover:text-white',
      triggerIcon,
    },
    ref,
  ) => {
    const triggerRef = useRef<HTMLButtonElement>(null);
    const [menuStyle, setMenuStyle] = useState<React.CSSProperties>({});

    const calcPosition = useCallback(() => {
      if (!triggerRef.current || !isOpen) return;
      const rect = triggerRef.current.getBoundingClientRect();

      const style: React.CSSProperties = { position: 'fixed', zIndex: 9999 };

      switch (menuPosition) {
        case 'top-right':
          style.right = window.innerWidth - rect.right;
          style.bottom = window.innerHeight - rect.top + 8;
          break;
        case 'top-left':
          style.left = rect.left;
          style.bottom = window.innerHeight - rect.top + 8;
          break;
        case 'bottom-left':
          style.left = rect.left;
          style.top = rect.bottom + 8;
          break;
        case 'left-start':
          style.right = window.innerWidth - rect.left + 8;
          style.top = rect.top;
          break;
        case 'right-start':
          style.left = rect.right + 8;
          style.top = rect.top;
          break;
        case 'bottom-right':
        default:
          style.right = window.innerWidth - rect.right;
          style.top = rect.bottom + 8;
          break;
      }

      setMenuStyle(style);
    }, [isOpen, menuPosition]);

    useEffect(() => {
      calcPosition();
    }, [calcPosition]);

    useEffect(() => {
      if (!isOpen) return;
      window.addEventListener('scroll', calcPosition, true);
      window.addEventListener('resize', calcPosition);
      return () => {
        window.removeEventListener('scroll', calcPosition, true);
        window.removeEventListener('resize', calcPosition);
      };
    }, [isOpen, calcPosition]);

    const handleView = () => {
      onView?.(projectId);
    };

    const handleEdit = () => {
      onEdit?.(projectId);
    };

    const handleStatusClick = (id: number | string) => {
      onStatusChange?.(id, 'In Progress');
    };

    return (
      <div className="flex items-center justify-center relative">
        <button
          ref={triggerRef}
          onClick={(e) => {
            e.stopPropagation();
            onToggle();
          }}
          className={triggerClassName}
        >
          {triggerIcon || <MoreHorizontal className="w-5 h-5" color="white" />}
        </button>

        {isOpen &&
          createPortal(
            <div
              ref={ref}
              style={menuStyle}
              className="w-40 bg-[#101828] border-[0.5px] shadow-sm border-[#6A7282] rounded-sm overflow-hidden flex flex-col p-1 text-center"
            >
              <Button className={actionButtonClass} onClick={handleEdit}>
                Edit Portfolio
              </Button>
              <hr className={hrClass} />
              <Button className={actionButtonClass} onClick={handleView}>
                View Detail
              </Button>
              <hr className={hrClass} />
              <Button
                className={actionButtonClass}
                onClick={() => handleStatusClick(projectId)}
              >
                Change Status
              </Button>
            </div>,
            document.body,
          )}
      </div>
    );
  },
);

ProjectActionMenu.displayName = 'ProjectActionMenu';
