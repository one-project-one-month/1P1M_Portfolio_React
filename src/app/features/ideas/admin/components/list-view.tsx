import { Text, Tooltip } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { EmptyIdeasState } from '../../shared/components';
import { STATUS_COLORS } from '../../shared/constants';
import { formatStatus, truncateText } from '../../shared/lib';
import type { IdeaType } from '../../shared/types/project-idea.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const TABLE_HEADERS = [
  'Idea Name',
  'Submitter',
  'React Count',
  'Leader',
  'Status',
  'Action',
] as const;

const IdeaManagementTable = ({ data }: { data: IdeaType[] }) => {
  if (!data || data.length === 0) {
    return <EmptyIdeasState />;
  }

  return (
    <div className="mx-auto overflow-x-auto backdrop-blur-sm">
      <div className="rounded-xl border border-slate-700 bg-slate-900/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-white text-bold text-xl">
              {TABLE_HEADERS.map((header) => (
                <th key={header} className="py-5 px-6 font-semibold">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {data.map((idea) => (
              <tr key={idea.projectIdeaId} className="hover:bg-slate-800/40">
                {/* Idea Name */}
                <td className="py-4">
                  <div className="relative group text-center text-white font-medium capitalize">
                    <Tooltip content={idea.projectIdeaName}>
                      <Text as="div" size="4">
                        {truncateText(idea.projectIdeaName)}
                      </Text>
                    </Tooltip>
                  </div>
                </td>

                {/* Developer */}
                <td className="py-4">
                  <div className="flex justify-start items-center gap-3">
                    <img
                      src={idea.ownerProfilePicUrl}
                      alt={idea.devUsername}
                      className="size-10 rounded-full object-cover"
                    />
                    <Link
                      to={`/profile/${idea.dev_id}`}
                      state={{ userId: idea.dev_id }}
                      className="text-slate-300 text-sm capitalize font-semibold hover:text-[#6F28B3]"
                    >
                      {truncateText(idea.devUsername)}
                    </Link>
                  </div>
                </td>

                {/* React Count */}
                <td className="py-4 text-center text-slate-400">
                  {idea.reactionCount}
                </td>

                {/* Leader */}
                <td className="py-4 text-sm text-slate-300">
                  {idea.leader_id !== 0 ? (
                    <div className="flex items-center justify-center gap-3">
                      <Link
                        to={`/profile/${idea.leader_id}`}
                        state={{ userId: idea.leader_id }}
                        className="text-slate-300 text-sm capitalize font-semibold hover:text-[#6F28B3]"
                      >
                        <img
                          src={idea.leaderProfilePicUrl}
                          className="size-10 rounded-full object-cover"
                        />{' '}
                      </Link>
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-3">
                      ---
                    </div>
                  )}
                </td>

                {/* Status */}
                <td className="py-4 text-center text-sm">
                  <span
                    className="capitalize"
                    style={{ color: STATUS_COLORS[idea.status] }}
                  >
                    {formatStatus(idea.status)}
                  </span>
                </td>

                {/* Actions */}
                <td className="py-4 text-center relative">
                  <ProjectIdeaDropDown type="list" data={idea} />
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
