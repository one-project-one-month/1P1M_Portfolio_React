import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Text, Tooltip } from '@radix-ui/themes';
import type {
  IdeaManagementTableType,
  ProjectIdeaType,
} from '../types/idea-management.types';
import { ProjectIdeaDropDown } from './project-idea-drop-down';

const truncate = (text: string, max = 25) =>
  text.length > max ? text.slice(0, max) + '...' : text;

const statusColor: Record<ProjectIdeaType['status'], string> = {
  APPROVED: '#7CCF00',
  PENDING: '#FD9A00',
  ARCHIVED: '#A6A09B',
};

const IdeaManagementTable = ({
  // data,
  handleEdit,
  handleDelete,
  handleViewDetail,
  handleStatusChange,
}: IdeaManagementTableType) => {
  return (
    <div className="mx-auto overflow-x-auto">
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
            {/* {data.map((idea) => ( */}
            <tr
              // key={idea.id}
              className="hover:bg-slate-800/40"
            >
              {/* Idea Name */}
              <td className="py-4">
                <div className="relative group text-center text-white font-medium capitalize">
                  <Tooltip content="smart order & booking">
                    <Text as="div" size="4">
                      {truncate('smart order & booking')}
                    </Text>
                  </Tooltip>
                </div>
              </td>

              {/* Developer */}
              <td className="py-4">
                <div className="flex justify-center items-center gap-3">
                  <img
                    src={sampleUserImgUrl}
                    className="size-10 rounded-full object-cover"
                  />
                  {/* <img
                      src={idea.profilePictureUrl}
                      alt={idea.devName}
                    className="size-10 rounded-full object-cover"
                    /> */}
                  <span className="text-slate-300 text-sm capitalize font-semibold">
                    {/* {idea.devName} */}
                    annette black
                  </span>
                </div>
              </td>

              {/* React Count */}
              <td className="py-4 text-center text-slate-400">
                {/* {idea.reaction_count} */}
                30
              </td>

              {/* Leader */}
              <td className="py-4 text-sm text-slate-300">
                <div className="flex items-center justify-center gap-3">
                  <img
                    src={sampleUserImgUrl}
                    className="size-10 rounded-full object-cover"
                  />
                  {/* <img
                      src={idea.profilePictureUrl}
                      alt={idea.devName}
                    className="size-10 rounded-full object-cover"
                    /> */}
                  <span className="text-slate-300 text-sm capitalize font-semibold">
                    {/* {idea.devName} */}
                    annette black
                  </span>
                </div>{' '}
              </td>

              {/* Status */}
              <td className="py-4 text-center text-sm">
                <span
                  className="capitalize"
                  style={{ color: statusColor['PENDING'] }}
                >
                  {/* {idea.status} */}
                  pending
                </span>
              </td>

              {/* Actions */}
              <td className="py-4 text-center relative">
                <ProjectIdeaDropDown
                  type="list"
                  // data={data}
                  handleEdit={handleEdit}
                  handleViewDetail={handleViewDetail}
                  handleDelete={handleDelete}
                  handleStatusChange={handleStatusChange}
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
