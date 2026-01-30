import { UserManagementDropDown } from '@/app/features/user-management/components/user-management-drop-down';
import type { UserManagementTableType } from '@/app/features/user-management/types/user-management.types';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';

const truncate = (text: string, max = 25) =>
  (text ?? '').length > max ? text.slice(0, max) + '...' : text;

const emailText = (text: string, max = 10) =>
  (text ?? '').length > max ? text.slice(0, max) + '...' : text;

const nameText = (text: string, max = 6) =>
  (text ?? '').length > max ? text.slice(0, max) + '...' : text;
const statusColor: Record<UserManagementTableType['status'], string> = {
  APPROVED: '#7CCF00',
  BANNED: '#A6A09B',
};

const UserManagement = ({
  data,
  handleEdit,
  handleViewDetail,
  handleBanned,
  handleRestore,
}: UserManagementTableType) => {
  return (
    <div className="mx-auto overflow-x-auto">
      <div className="rounded-xl border border-slate-700 bg-slate-900/20">
        <table className="w-full">
          <thead>
            <tr className="border-b border-slate-700 text-white text-bold text-xl">
              {[
                'No',
                'Name',
                'Email',
                'Telegram',
                'GitHub',
                'LinkedIn',
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
            {data.map((user: any) => (
              <tr
                // key={idea.id}
                className="hover:bg-slate-800/40"
              >
                <td className="py-4 text-center text-sm  text-slate-400">
                  {user.userId}
                </td>
                <td className="py-4 w-full  flex justify-center items-center">
                  <div className="flex items-center justify-center   gap-3">
                    <img
                      src={sampleUserImgUrl}
                      className="size-10 rounded-full  object-cover"
                    />
                    <span className=" text-slate-400 text-sm font-semibold">
                      {nameText(user.name)}
                    </span>
                  </div>{' '}
                </td>
                <td className="py-4 text-center text-sm  text-slate-400">
                  {emailText(user.email)}
                </td>
                <td className="py-4 text-center text-sm  text-slate-400">
                  {user.telegramUsername === null
                    ? '@jonDoe'
                    : user.telegramUsername}
                </td>
                <td className="py-4 text-center text-sm  text-slate-400">
                  {truncate(user.githubUrl)}
                </td>
                <td className="py-4 text-center text-sm  text-slate-400">
                  {truncate(user.linkedUrl)}
                </td>
                <td className="py-4 text-center text-sm">
                  <span
                    className="capitalize"
                    style={{ color: statusColor['APPROVED'] }}
                  >
                    Approved
                  </span>
                </td>

                <td className="py-4 text-center relative" key={user.userId}>
                  <UserManagementDropDown
                    // type="list"
                    userId={user.userId}
                    handleEdit={() => handleEdit(user.userId)}
                    handleViewDetail={() => handleViewDetail(user.userId)}
                    handleBanned={handleBanned}
                    handleRestore={handleRestore}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
