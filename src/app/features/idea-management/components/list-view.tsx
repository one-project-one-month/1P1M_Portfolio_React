import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Text, Tooltip } from '@radix-ui/themes';
import { Link } from 'react-router-dom';
import type { ProjectIdeaType } from '../types/project-idea.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const truncate = (text: string, max = 25) =>
  text.length > max ? text.slice(0, max) + '...' : text;

const statusColor: Record<ProjectIdeaType['status'], string> = {
  APPROVED: '#7CCF00',
  PENDING: '#FD9A00',
  ARCHIVED: '#A6A09B',
};

const IdeaManagementTable = ({ data }: { data: ProjectIdeaType[] }) => {
  return (
    <div className="mx-auto overflow-x-auto">
      {data.length > 0 ? (
        <div className="rounded-xl border border-slate-700 bg-slate-900/20">
          <table className="w-full">
            <thead>
              <tr className="border-b border-slate-700 text-white text-bold text-xl">
                {[
                  'Idea Name',
                  'Submitter',
                  'React Count',
                  'Leader',
                  'Status',
                  'Action',
                ].map((h) => (
                  <th key={h} className="py-5 px-6 font-semibold">
                    {h}
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
                          {truncate(`${idea.projectIdeaName}`)}
                        </Text>
                      </Tooltip>
                    </div>
                  </td>

                  {/* Developer */}
                  <td className="py-4">
                    <div className="flex justify-center items-center gap-3">
                      <img
                        src={sampleUserImgUrl}
                        alt={idea.devName}
                        className="size-10 rounded-full object-cover"
                      />
                      <Link
                        to={`/profile/${idea.devName}`}
                        state={{ userId: idea.dev_id }}
                        className="text-slate-300 text-sm capitalize font-semibold hover:text-[#6F28B3]!"
                      >
                        {truncate(`${idea.devName}`)}
                      </Link>
                    </div>
                  </td>
                  {/* React Count */}
                  <td className="py-4 text-center text-slate-400">
                    {idea.reactionCount}
                  </td>

                  {/* Leader */}
                  <td className="py-4 text-sm text-slate-300">
                    <div className="flex items-center justify-center gap-3">
                      <img
                        src={sampleUserImgUrl}
                        alt={idea.devName}
                        className="size-10 rounded-full object-cover"
                      />
                      <Link
                        to={`/profile/${idea.devName}`}
                        state={{ userId: idea.dev_id }}
                        className="text-slate-300 text-sm capitalize font-semibold hover:text-[#6F28B3]!"
                      >
                        {idea.devName}
                        {/* {truncate(`${idea.devName}`)} */}
                      </Link>
                    </div>
                  </td>

                  {/* Status */}
                  <td className="py-4 text-center text-sm">
                    <span
                      className="capitalize"
                      style={{ color: statusColor[idea.status] }}
                    >
                      {idea.status}
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
      ) : (
        <p className="text-slate-400">No project ideas</p>
      )}
    </div>
  );
};

export default IdeaManagementTable;
