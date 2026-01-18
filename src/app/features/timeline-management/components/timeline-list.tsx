import type { Timeline } from '@/app/features/timeline-management/types.ts';
import { Edit2, MoreHorizontal, Trash2 } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

const TimelineList: React.FC<Timeline> = ({ data }) => {
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const menuRef = useRef<HTMLDivElement | null>(null);

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

  return (
    <div className="w-full overflow-hidden border border-white/10 rounded-xl bg-[#111827]">
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="border-b border-white/10 bg-white/5 text-gray-400 text-xs uppercase tracking-wider">
            <th className="px-6 py-4 font-medium">No.</th>
            <th className="px-6 py-4 font-medium">Name</th>
            <th className="px-6 py-4 font-medium">Start Date</th>
            <th className="px-6 py-4 font-medium">End Date</th>
            <th className="px-6 py-4 font-medium">Status</th>
            <th className="px-6 py-4 font-medium text-right">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-white/5">
          {data.map((item, index) => (
            <tr
              key={item.id}
              className="hover:bg-white/[0.02] transition-colors group"
            >
              <td className="px-6 py-4 text-sm text-gray-500">
                {String(index + 1).padStart(2, '0')}
              </td>
              <td className="px-6 py-4 text-sm font-medium text-white">
                {item.name}
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                {item.startDate}
              </td>
              <td className="px-6 py-4 text-sm text-gray-400">
                {item.endDate}
              </td>
              <td className="px-6 py-4">
                <span
                  className={`px-2.5 py-1 rounded-md text-[11px] font-semibold`}
                >
                  {item.status}
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
                    <div className="absolute right-0 mt-2 w-32 origin-top-right bg-[#1F2937] border border-white/10 rounded-lg shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
                      <div className="py-1">
                        <button
                          onClick={() => {
                            console.log('Edit', item.id);
                            setOpenMenuId(null);
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-300 hover:bg-[#9C39FC]/10 hover:text-[#9C39FC] transition-colors"
                        >
                          <Edit2 size={14} />
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            console.log('Delete', item.id);
                            setOpenMenuId(null);
                          }}
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
    </div>
  );
};

export default TimelineList;
