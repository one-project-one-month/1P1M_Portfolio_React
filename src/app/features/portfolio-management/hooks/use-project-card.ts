import type { ProjectStatus } from '@/types/portfolio-management';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ProjectData } from '../constants/data';
import { useReactProject, useUnreactProject } from './use-portfolio-query';

interface UseProjectCardProps {
  data: ProjectData;
  onDelete?: (id: string) => void;
  onStatusChange?: (id: number, status: ProjectStatus) => void;
}

export const useProjectCard = ({
  data,
  onDelete,
  onStatusChange,
}: UseProjectCardProps) => {
  const navigate = useNavigate();
  const { id, reactCount = 0, isReacted = false } = data;

  const [localIsReacted, setLocalIsReacted] = useState(isReacted);
  const [localReactCount, setLocalReactCount] = useState(reactCount);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [deleteProjectId, setDeleteProjectId] = useState<string | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const [showMembersPopover, setShowMembersPopover] = useState(false);
  const [statusDialogProjectId, setStatusDialogProjectId] = useState<
    number | null
  >(null);

  const menuRef = useRef<HTMLDivElement>(null);
  const popoverRef = useRef<HTMLDivElement>(null);

  const reactMutation = useReactProject();
  const unreactMutation = useUnreactProject();

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

  const handleReactClick = () => {
    if (localIsReacted) {
      setLocalIsReacted(false);
      setLocalReactCount((prev) => Math.max(0, prev - 1));
      unreactMutation.mutate(id, {
        onError: () => {
          setLocalIsReacted(true);
          setLocalReactCount((prev) => prev + 1);
        },
      });
    } else {
      setLocalIsReacted(true);
      setLocalReactCount((prev) => prev + 1);
      reactMutation.mutate(id, {
        onError: () => {
          setLocalIsReacted(false);
          setLocalReactCount((prev) => Math.max(0, prev - 1));
        },
      });
    }
  };

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

  const handleStatusChange = (projectId: string | number) => {
    setIsMenuOpen(false);
    setStatusDialogProjectId(projectId as number);
  };

  const handleStatusConfirm = (newStatus: ProjectStatus) => {
    if (statusDialogProjectId !== null) {
      onStatusChange?.(statusDialogProjectId, newStatus);
      setStatusDialogProjectId(null);
    }
  };

  const toggleMembersPopover = () => {
    setShowMembersPopover(!showMembersPopover);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return {
    localIsReacted,
    localReactCount,
    isMenuOpen,
    deleteProjectId,
    showSuccessToast,
    showMembersPopover,
    statusDialogProjectId,
    menuRef,
    popoverRef,
    handleReactClick,
    handleView,
    handleEdit,
    handleDeleteClick,
    handleConfirmDelete,
    handleStatusChange,
    handleStatusConfirm,
    toggleMembersPopover,
    toggleMenu,
    setDeleteProjectId,
    setShowSuccessToast,
    setStatusDialogProjectId,
  };
};
