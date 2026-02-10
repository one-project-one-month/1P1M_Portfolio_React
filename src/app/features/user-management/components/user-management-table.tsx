import { UserManagementDropDown } from '@/app/features/user-management/components/user-management-drop-down';
import type { UserManagementType } from '@/app/features/user-management/types/user-management.types';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Link } from 'react-router-dom';

const truncate = (text: string, max = 15) =>
  (text ?? '').length > max ? text.slice(0, max) + '...' : text;

const statusColor: Record<UserManagementType['status'], string> = {
  ACTIVE: '#7CCF00',
  Banned: '#9F0712',
};

const UserManagementTable = ({ data }: { data: UserManagementType[] }) => {
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
            {data.map((user) => (
              <tr key={user.userId} className="hover:bg-slate-800/40">
                <td className="py-4 text-center text-slate-400">
                  {user.devId}
                </td>
                <td className="py-4 ">
                  <div className="flex  items-center gap-3">
                    <img
                      src={sampleUserImgUrl}
                      className="size-10 rounded-full object-cover"
                    />
                    <Link
                      to={`view-details/${user.userId}`}
                      className=" text-slate-400 text-sm hover:text-[#9C39FC] font-semibold"
                    >
                      {truncate(user.name, 5)}
                    </Link>
                  </div>
                </td>
                <td className="py-4 text-center text-slate-400">
                  {truncate(user.email, 14)}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {user.telegramUsername}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {truncate(user.githubUrl, 14)}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {truncate(user.linkedUrl, 15)}
                </td>
                <td className="py-4 text-center text-sm">
                  <span
                    className="capitalize"
                    style={{ color: statusColor[user.status] }}
                  >
                    {user.status}
                  </span>
                </td>
                <td className="py-4 text-center items-center relative">
                  <UserManagementDropDown data={user} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagementTable;
