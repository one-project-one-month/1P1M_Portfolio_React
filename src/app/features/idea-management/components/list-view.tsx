import { MoreVertical } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import type {
  IdeaManagementTableProps,
  ProjectIdeaType,
} from '../types/idea-management.types';
import Action from './action-button';

const truncate = (text: string, max = 35) =>
  text.length > max ? text.slice(0, max) + '...' : text;

const statusColor: Record<ProjectIdeaType['status'], string> = {
  Approved: 'text-green-400',
  Pending: 'text-yellow-400',
  Archived: 'text-gray-400',
};

const TOOLTIP_STYLE =
  'absolute left-1/2 -translate-x-1/2 bottom-full mb-3 ' +
  'bg-white/10 backdrop-blur-md text-white text-sm ' +
  'px-4 py-2 rounded-md shadow-xl border border-white/20 ' +
  'opacity-0 invisible group-hover:opacity-100 group-hover:visible ' +
  'transition-all duration-300 z-20 w-max max-w-[200px] text-center';

const IdeaManagementTable = ({
  data,
  handleEdit,
  handleDelete,
  handleViewDetail,
  handleStatusChange,
  handleImportPortfolio,
}: IdeaManagementTableProps) => {
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener('mousedown', close);
    return () => document.removeEventListener('mousedown', close);
  }, []);

  return (
    <div className="max-w-7xl mx-auto overflow-x-auto">
      <div className="rounded-xl border border-slate-700 bg-slate-900/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-white text-sm uppercase">
              {[
                'Idea Name',
                'Developer',
                'Reacts',
                'Type',
                'Status',
                'Action',
              ].map((h) => (
                <th key={h} className="py-5 px-6 text-left font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {data.map((idea) => (
              <tr key={idea.id} className="hover:bg-slate-800/40">
                {/* Idea Name */}
                <td className="py-6 px-6">
                  <div className="relative group text-white font-medium">
                    {truncate(idea.projectName)}
                    {idea.projectName.length > 35 && (
                      <div className={TOOLTIP_STYLE}>{idea.projectName}</div>
                    )}
                  </div>
                </td>

                {/* Developer */}
                <td className="py-6 px-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={idea.profilePictureUrl}
                      alt={idea.devName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    />
                    <span className="text-slate-300 text-sm">
                      {idea.devName}
                    </span>
                  </div>
                </td>

                {/* React Count */}
                <td className="py-6 px-6 text-center text-slate-400 font-mono">
                  {idea.reaction_count}
                </td>

                {/* Project Types */}
                <td className="py-6 px-6 text-sm text-slate-300">
                  {idea.projectTypes.join(', ') || '—'}
                </td>

                {/* Status */}
                <td className="py-6 px-6 text-sm">
                  <span
                    className={`${statusColor[idea.status]} font-semibold px-2 py-1 rounded-md bg-white/5`}
                  >
                    {idea.status}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-6 px-6 text-center relative">
                  <div
                    ref={openMenuId === idea.id ? menuRef : null}
                    className="inline-block"
                  >
                    <button
                      onClick={() =>
                        setOpenMenuId(openMenuId === idea.id ? null : idea.id)
                      }
                      className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white"
                    >
                      <MoreVertical size={18} className="rotate-90" />
                    </button>

                    {openMenuId === idea.id && (
                      <div className="absolute right-full mr-2 top-0 w-44 z-50 flex flex-col gap-1">
                        <Action
                          label="Edit Idea"
                          onClick={() => () => handleEdit(idea.id)}
                        />
                        <Action
                          label="View Detail"
                          onClick={() => handleViewDetail(idea.id)}
                        />
                        <Action
                          label="Delete Idea"
                          danger
                          onClick={() => handleDelete(idea.id)}
                        />
                        <Action
                          label="Change Status"
                          danger
                          onClick={() => handleStatusChange(idea.status)}
                        />
                        <Action
                          label="Import Portfolio"
                          danger
                          onClick={() => handleImportPortfolio(idea.id)}
                        />
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
