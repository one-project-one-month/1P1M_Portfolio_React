import { Eye } from 'lucide-react';
import type { OpomRegisteredListTableType } from '../types/opom-registered-list-type';

export const OpomRegisteredListTable = ({
  data,
  handleViewDetail,
}: OpomRegisteredListTableType) => {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-[#99A1AF] bg-[rgba(255,255,255,0.09)]">
      <table className="w-full text-sm text-left text-slate-300">
        <thead>
          <tr className="border-b border-[#99A1AF]">
            <th className="px-4 py-3">No</th>
            <th className="px-4 py-3">Name</th>
            <th className="px-4 py-3">Phone</th>
            <th className="px-4 py-3">Telegram</th>
            <th className="px-4 py-3">Role</th>
            <th className="px-4 py-3">Timeline</th>
            <th className="px-4 py-3 text-center">Projects</th>
            <th className="px-4 py-3 text-center">Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((person, index) => (
            <tr
              key={person.id}
              className="border-b border-[#99A1AF] hover:bg-slate-900/50"
            >
              <td className="px-4 py-3">{index + 1}</td>
              <td className="px-4 py-3">
                <div className="flex items-center gap-3">
                  <img
                    // src={person.avatar || '/default-avatar.png'}
                    alt={person.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-700"
                  />
                  <span className="font-medium text-white">{person.name}</span>
                </div>
              </td>
              <td className="px-4 py-3">{person.phone}</td>
              <td className="px-4 py-3">{person.telegram_username}</td>
              <td className="px-4 py-3">{person.role}</td>
              {/* <td className="px-4 py-3">{person.timeline}</td> */}
              <td className="px-4 py-3 text-center">
                {/* {person.projects} */}
              </td>
              <td className="px-4 py-3 text-center">
                <Eye
                  className="w-4 h-4 cursor-pointer text-slate-400 hover:text-white transition"
                  onClick={() => handleViewDetail(person.id)}
                />
              </td>
            </tr>
          ))}
          {data.length === 0 && (
            <tr>
              <td colSpan={8} className="px-4 py-8 text-center text-slate-500">
                No registered people found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};
