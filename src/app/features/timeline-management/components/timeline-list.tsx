import TimelineForm from '@/app/features/timeline-management/components/timeline-form.tsx';
import { timelineService } from '@/app/features/timeline-management/services/timeline-service.ts';
import type {
  Timeline,
  TimelineProps,
} from '@/app/features/timeline-management/services/types.ts';
import ConfirmationModal from '@/components/ui/confirm-modal.tsx';
import { useToast } from '@/components/ui/toast-provider';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const formatStatus = (val?: string) =>
  val ? val.charAt(0).toUpperCase() + val.slice(1).toLowerCase() : 'Active';

const TimelineList: React.FC<TimelineProps> = ({ data, refreshData }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [editData, setEditData] = useState<Timeline | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState<boolean>(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState<boolean>(false);
  const { addToast } = useToast();

  if (data.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-500">
        <p className="text-lg">No timelines found</p>
        <p className="text-sm">Try adjusting your search or filters.</p>
      </div>
    );
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEditClick = (data: Timeline) => {
    setIsEditModalOpen(true);
    setEditData(data);
    setOpenMenuId(null);
  };

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setIsDeleteModalOpen(true);
    setOpenMenuId(null);
  };

  const confirmDelete = async () => {
    if (!selectedId) return;

    try {
      await timelineService.deleteTimeline(selectedId);

      addToast('Project Deleted successfully', 'success');
      console.log('Successfully deleted!');

      refreshData();
    } catch (error) {
      addToast('Failed to delete timeline', 'error');
      console.error('Failed to delete timeline:', error);
    } finally {
      setIsDeleteModalOpen(false);
      setSelectedId(null);
    }
  };

  return (
    <div className="w-full border border-white/10 rounded-xl bg-transparent">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-white text-xl uppercase tracking-wider">
            <th className="font-semibold px-6 py-4">No.</th>
            <th className="font-semibold px-6 py-4">Name</th>
            <th className="font-semibold px-6 py-4">Start Date</th>
            <th className="font-semibold px-6 py-4">End Date</th>
            <th className="font-semibold px-6 py-4">Status</th>
            <th className="font-semibold text-right px-6 py-4">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-white/2 transition-colors group"
            >
              <td className="px-6 py-4 text-md text-white">
                {String(index + 1).padStart(2, '0')}
              </td>
              <td className="px-6 py-4 text-md font-medium text-white">
                {item.name}
              </td>
              <td className="px-6 py-4 text-md text-white">{item.startDate}</td>
              <td className="px-6 py-4 text-md text-white">{item.endDate}</td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-m text-md text-white font-semibold`}
                >
                  {formatStatus(item.timeLineStatus)}
                </span>
              </td>
              <td className="px-6 py-4 text-right">
                <div
                  className="relative inline-block text-left"
                  ref={openMenuId === item.id ? menuRef : null}
                >
                  <button
                    onClick={() => toggleMenu(item.id)}
                    className={`p-2 rounded-md transition-colors ${
                      openMenuId === item.id
                        ? 'bg-[#9C39FC]/20 text-[#9C39FC]'
                        : 'text-gray-400 hover:bg-white/5'
                    }`}
                  >
                    <MoreHorizontal size={18} />
                  </button>

                  {/*  Dropdown Menu */}
                  {openMenuId === item.id && (
                    <div className="absolute right-0 mt-2 w-32 origin-top-right bg-[#1F2937] border border-white/10 rounded-lg shadow-2xl z-[999] overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <div className="py-1">
                        <button
                          onClick={() => handleEditClick(item)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#9C39FC]/10 hover:text-[#9C39FC] transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => handleDeleteClick(item.id)}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/10 transition-colors"
                        >
                          <Trash2 size={14} />
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/*-------- Start Edit Modal --------*/}
      <TimelineForm
        isOpen={isEditModalOpen}
        setIsOpen={setIsEditModalOpen}
        data={editData}
        onSuccess={refreshData}
      />
      {/*-------- End Edit Modal --------*/}

      {/*-------- Start Delete Confirm Modal --------*/}
      <ConfirmationModal
        isOpen={isDeleteModalOpen}
        title="Delete Timeline"
        subtitle="Are you sure you want to delete this timeline? This action cannot be undone."
        onCancel={() => setIsDeleteModalOpen(false)}
        onConfirm={confirmDelete}
      />
      {/*-------- End Delete Confirm Modal --------*/}
    </div>
  );
};

export default TimelineList;
