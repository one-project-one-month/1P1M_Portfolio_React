import { useEffect, useRef, useState } from 'react';

export const usePortfolioActions = () => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [deleteProjectId, setDeleteProjectId] = useState<number | null>(null);
  const [showSuccessToast, setShowSuccessToast] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close  when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (showSuccessToast) {
      const timer = setTimeout(() => {
        setShowSuccessToast(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessToast]);

  const handleMenuClick = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleDeleteClick = (id: number) => {
    setDeleteProjectId(id);
    setOpenMenuId(null);
  };

  return {
    openMenuId,
    deleteProjectId,
    setDeleteProjectId,
    menuRef,
    handleMenuClick,
    handleDeleteClick,
    showSuccessToast,
    setShowSuccessToast,
  };
};
