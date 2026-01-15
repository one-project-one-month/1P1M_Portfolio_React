import { MoreVertical } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

// --- Types & Interfaces ---

export type IdeaStatus = 'Approved' | 'Pending' | 'Archived' | 'All';

export interface UserProfile {
  name: string;
  avatar: string;
}

export interface IdeaData {
  id: number;
  ideaName: string;
  submitter: UserProfile;
  reactCount: number | string;
  leader: UserProfile | null;
  status: Exclude<IdeaStatus, 'All'>;
}

interface IdeaManagementTableProps {
  data: IdeaData[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
  onViewDetail?: (id: number) => void;
  onStatusChange?: (id: number, newStatus: IdeaStatus) => void;
}

// --- Helper Functions ---

const truncateText = (text: string, maxLength: number = 35): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};

const getStatusColor = (status: IdeaData['status']): string => {
  const colors = {
    Approved: 'text-green-400',
    Pending: 'text-yellow-400',
    Archived: 'text-gray-400',
  };
  return colors[status] || 'text-gray-400';
};

const getAvatarColor = (index: number): string => {
  const colors = [
    'bg-blue-500',
    'bg-cyan-500',
    'bg-rose-500',
    'bg-orange-500',
    'bg-amber-600',
    'bg-purple-500',
  ];
  return colors[index % colors.length];
};

const TOOLTIP_STYLE = `absolute left-1/2 -translate-x-1/2 bottom-full mb-3 
  bg-white/10 backdrop-blur-md text-white text-sm 
  px-4 py-2 rounded-md shadow-xl border border-white/20 
  opacity-0 invisible group-hover:opacity-100 group-hover:visible 
  transition-all duration-300 z-20 flex flex-col items-center
  w-max max-w-[200px] whitespace-normal text-center leading-tight`;

// --- Main Component ---

const IdeaManagementTable: React.FC<IdeaManagementTableProps> = ({
  data = [],
  onEdit,
  onDelete,
  onViewDetail,
  //   onStatusChange
}) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto">
      <div className="rounded-xl border border-slate-700 bg-slate-900/20">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-slate-700 text-slate-400 text-sm uppercase tracking-wider">
              <th className="text-left py-5 px-6 font-semibold">Idea Name</th>
              <th className="text-left py-5 px-6 font-semibold">Submitter</th>
              <th className="text-left py-5 px-6 font-semibold">Reacts</th>
              <th className="text-left py-5 px-6 font-semibold">Leader</th>
              <th className="text-left py-5 px-6 font-semibold">Status</th>
              <th className="text-center py-5 px-6 font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {data.map((item, index) => (
              <tr
                key={item.id}
                className="group hover:bg-slate-800/40 transition-colors"
              >
                {/* Idea Name with Tooltip */}
                <td className="py-6 px-6">
                  <div className="text-white font-medium group/tip relative cursor-help">
                    {truncateText(item.ideaName)}
                    {item.ideaName.length > 35 && (
                      <div className={TOOLTIP_STYLE}>
                        <span>{item.ideaName}</span>
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-white/10 rotate-45 border-r border-b border-white/20" />
                      </div>
                    )}
                  </div>
                </td>

                {/* Submitter */}
                <td className="py-6 px-6">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-8 h-8 rounded-full ${getAvatarColor(index)} flex items-center justify-center text-white text-xs font-bold`}
                    >
                      {item.submitter.avatar}
                    </div>
                    <span className="text-slate-300 text-sm">
                      {item.submitter.name}
                    </span>
                  </div>
                </td>

                {/* React Count */}
                <td className="py-6 px-6 text-center">
                  <span className="text-slate-400 font-mono text-sm">
                    {item.reactCount}
                  </span>
                </td>

                {/* Leader */}
                <td className="py-6 px-6">
                  {item.leader ? (
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-8 h-8 rounded-full ${getAvatarColor(index + 2)} flex items-center justify-center text-white text-xs font-bold`}
                      >
                        {item.leader.avatar}
                      </div>
                      <span className="text-slate-300 text-sm">
                        {item.leader.name}
                      </span>
                    </div>
                  ) : (
                    <span className="text-slate-600 italic text-sm">
                      Unassigned
                    </span>
                  )}
                </td>

                {/* Status */}
                <td className="py-6 px-6 text-sm">
                  <span
                    className={`${getStatusColor(item.status)} font-semibold px-2 py-1 rounded-md bg-white/5`}
                  >
                    {item.status}
                  </span>
                </td>

                {/* Actions Menu */}
                <td className="py-6 px-6 text-center relative">
                  <div
                    ref={openMenuId === item.id ? menuRef : null}
                    className="inline-block"
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === item.id ? null : item.id)
                      }
                      className={`p-2 rounded-lg transition-all ${openMenuId === item.id ? 'bg-slate-700 text-white' : 'text-slate-400 hover:bg-slate-800 hover:text-white'}`}
                    >
                      <MoreVertical size={18} className="rotate-90" />
                    </button>

                    {openMenuId === item.id && (
                      <div className="absolute right-full mr-2 top-0 w-44 flex flex-col gap-1 z-50">
                        {[
                          {
                            label: 'Edit Idea',
                            action: () => onEdit?.(item.id),
                          },
                          {
                            label: 'View Detail',
                            action: () => onViewDetail?.(item.id),
                          },
                          {
                            label: 'Delete Idea',
                            action: () => onDelete?.(item.id),
                            color: 'text-rose-400',
                          },
                        ].map((btn) => (
                          <button
                            key={btn.label}
                            onClick={() => {
                              btn.action();
                              setOpenMenuId(null);
                            }}
                            className={`w-full text-left px-4 py-2 text-sm bg-slate-900 border border-slate-700 rounded-lg hover:bg-slate-800 transition-colors ${btn.color || 'text-slate-200'}`}
                          >
                            {btn.label}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdeaManagementTable;
