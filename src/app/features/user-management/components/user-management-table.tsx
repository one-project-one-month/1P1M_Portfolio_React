import { UserManagementDropDown } from '@/app/features/user-management/components/user-management-drop-down';
import type { UserManagementTableType } from '@/app/features/user-management/types/user-management.types';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';

const truncate = (text: string, max = 25) =>
  text.length > max ? text.slice(0, max) + '...' : text;

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
                <td className="py-4 text-center text-slate-400">{user.id}</td>
                <td className="py-4 ">
                  <div className="flex  items-center gap-3">
                    <img
                      src={sampleUserImgUrl}
                      className="size-10 rounded-full object-cover"
                    />
                    <span className=" text-slate-400 text-sm font-semibold">
                      {user.name}
                    </span>
                  </div>{' '}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {user.email}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {user.telegram} <span>@mohmoh</span>
                </td>
                <td className="py-4 text-center text-slate-400">
                  {user.github
                    ? truncate(user.github, 15)
                    : truncate(`https://github.com/MohMohAung-devo`, 15)}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {user.github
                    ? truncate(user.linkedIn, 15)
                    : truncate(`https://github.com/MohMohAung-devo`, 15)}
                </td>
                <td className="py-4 text-center text-sm">
                  <span
                    className="capitalize"
                    style={{ color: statusColor['APPROVED'] }}
                  >
                    Approved
                  </span>
                </td>
                <td className="py-4 text-center relative">
                  <UserManagementDropDown
                    // type="list"

                    handleEdit={handleEdit}
                    handleViewDetail={handleViewDetail}
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
