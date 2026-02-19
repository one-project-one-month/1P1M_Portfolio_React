import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import { Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import type { OpomRegisteredListTableType } from '../types/opom-registered-list-type';
export const OpomRegisteredListTable = ({
  data,
  // handleViewDetail,
}: OpomRegisteredListTableType) => {
  return (
    <div className="mx-auto overflow-x-auto mt-6">
      <div className="rounded-xl border border-[#99A1AF] bg-[rgba(255,255,255,0.09)]">
        <table className="w-full">
          <thead>
            <tr className="border-b border-[#99A1AF] font-sans text-[#FFFFFF] text-bold text-xl">
              {[
                'No',
                'Name',
                'Phone',
                'Telegram',
                'Role',
                'TimeLine',
                'Project',
                'Action',
              ].map((h) => (
                <th key={h} className="py-5 px-10 font-semibold">
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-800">
            {data.map((person, index) => (
              <tr
                key={person.id}
                className="hover:bg-slate-800/40 border-b font-medium text-sm text-[#99A1AF] border-[#99A1AF]"
              >
                <td className="py-9 text-center text-slate-400">{index + 1}</td>
                <td className=" py-4">
                  <div className="flex items-center gap-3">
                    <img
                      src={sampleUserImgUrl}
                      alt={person.name}
                      className="w-9 h-9 rounded-full object-cover border border-slate-700"
                    />
                    <Link
                      to={`user-profile/${person.id}`}
                      className=" text-slate-400 text-sm capitalize hover:text-[#9C39FC] font-semibold"
                    >
                      {person.name}
                    </Link>
                  </div>
                </td>
                <td className="py-4 text-center text-slate-400">
                  {person.phone}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {person.telegram_username}
                </td>
                <td className="py-4 text-center text-slate-400">
                  {person.role}
                </td>

                <td className="py-4 text-center text-slate-400"></td>

                <td className="py-4 text-center text-slate-400"></td>
                <td className="py-4 flex justify-center   items-center ">
                  <Link to={`user-profile/${person.id}`}>
                    <Eye
                      className="w-4 h-4  cursor-pointer text-slate-400 hover:text-white transition"
                      // onClick={() => handleViewDetail(person.id)}
                    />
                  </Link>
                </td>
              </tr>
            ))}
            {data.length === 0 && (
              <tr>
                <td
                  colSpan={8}
                  className="px-4 py-8 text-center text-slate-500"
                >
                  No registered people found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};
