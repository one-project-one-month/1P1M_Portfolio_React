import { cn } from '@/lib/utils';
import { Avatar, Text, Tooltip } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import { EmptyIdeasState } from '../../shared/components';
import {
  changeProjectIdeaStatus,
  changeProjectIdeaStatusColor,
  truncateText,
} from '../../shared/lib';
import type { IdeaType } from '../../shared/types/project-idea.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const TABLE_HEADERS = [
  'Idea Name',
  'Submitter',
  'React Count',
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
                <td className="p-4">
                  <div className="flex justify-start items-center gap-3">
                    <Avatar
                      src={idea.ownerProfilePicUrl}
                      radius="full"
                      color="gray"
                      className=" bg-gray-600!"
                      fallback={idea.devUsername?.slice(0, 1)}
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

                {/* Status */}
                <td className="py-4 text-center text-sm">
                  <span
                    className={cn(
                      'capitalize',
                      changeProjectIdeaStatusColor(idea.status),
                    )}
                  >
                    {changeProjectIdeaStatus(idea.status)}
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
