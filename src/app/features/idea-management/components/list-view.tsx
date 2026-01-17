import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import type {
  IdeaManagementTableProps,
  ProjectIdeaType,
} from '../types/idea-management.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const truncate = (text: string, max = 35) =>
  text.length > max ? text.slice(0, max) + '...' : text;

const statusColor: Record<ProjectIdeaType['status'], string> = {
  APPROVED: 'text-green-400',
  PENDING: 'text-yellow-400',
  ARCHIVED: 'text-gray-400',
};

const TOOLTIP_STYLE =
  'absolute left-1/2 -translate-x-1/2 bottom-full mb-3 ' +
  'bg-white/10 backdrop-blur-md text-white text-sm ' +
  'px-4 py-2 rounded-md shadow-xl border border-white/20 ' +
  'opacity-0 invisible group-hover:opacity-100 group-hover:visible ' +
  'transition-all duration-300 z-20 w-max max-w-[200px] text-center';

const IdeaManagementTable = ({
  // data,
  handleEdit,
  handleDelete,
  handleViewDetail,
  handleStatusChange,
  handleImportPortfolio,
}: IdeaManagementTableProps) => {
  return (
    <div className="mx-auto overflow-x-auto">
      <div className="rounded-xl border border-slate-700 bg-slate-900/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-white text-bold text-lg">
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
            {/* {data.map((idea) => ( */}
            <tr
              // key={idea.id}
              className="hover:bg-slate-800/40"
            >
              {/* Idea Name */}
              <td className="py-6 px-6">
                <div className="relative group text-center text-white font-medium">
                  {/* {truncate(idea.projectName)}
                    {idea.projectName.length > 35 && (
                      <div className={TOOLTIP_STYLE}>{idea.projectName}</div>
                    )} */}
                  smart order & booking
                </div>
              </td>

              {/* Developer */}
              <td className="py-6 px-6">
                <div className="flex justify-center items-center gap-3">
                  <img
                    src={sampleUserImgUrl}
                    alt="username"
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  {/* <img
                      src={idea.profilePictureUrl}
                      alt={idea.devName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    /> */}
                  <span className="text-slate-300 text-sm capitalize">
                    {/* {idea.devName} */}
                    annette black
                  </span>
                </div>
              </td>

              {/* React Count */}
              <td className="py-6 px-6 text-center text-slate-400">
                {/* {idea.reaction_count} */}
                30
              </td>

              {/* Leader */}
              <td className="py-6 px-6 text-sm text-slate-300">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={sampleUserImgUrl}
                    alt="username"
                    className="w-8 h-8 rounded-full object-cover border border-slate-700"
                  />
                  {/* <img
                      src={idea.profilePictureUrl}
                      alt={idea.devName}
                      className="w-8 h-8 rounded-full object-cover border border-slate-700"
                    /> */}
                  <span className="text-slate-300 text-sm capitalize">
                    {/* {idea.devName} */}
                    annette black
                  </span>
                </div>{' '}
              </td>

              {/* Status */}
              <td className="py-6 px-6 text-center text-sm">
                <span
                  className={`${statusColor['PENDING']} font-semibold px-2 py-1 rounded-md bg-white/5 capitalize`}
                >
                  {/* {idea.status} */}
                  pending
                </span>
              </td>

              {/* Actions */}
              <td className="py-6 px-6 text-center relative">
                <ProjectIdeaDropDown
                  type="list"
                  // data={data}
                  handleEdit={handleEdit}
                  handleViewDetail={handleViewDetail}
                  handleDelete={handleDelete}
                  handleStatusChange={handleStatusChange}
                  handleImportPortfolio={handleImportPortfolio}
                />
              </td>
            </tr>
            {/* }))} */}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IdeaManagementTable;
