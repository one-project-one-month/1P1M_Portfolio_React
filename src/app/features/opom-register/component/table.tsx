import TableSkeletonRow from '@/app/features/opom-register/component/table-skeleton';
import useTable from '@/app/features/opom-register/hook/use-table';
import Filter from '@/assets/icons/filter.png';
import Search from '@/assets/icons/search.svg';
import DownArrow from '@/assets/icons/Vector (3).png';
import type { RegisterListProps } from '@/types/register';
import { useState } from 'react';

interface roleTypeProps {
  name: string;
}

const roleOptions: roleTypeProps[] = [
  { name: 'Frontend Developer' },
  { name: 'Backend Developer' },
  { name: 'Uiux Desinger' },
];

interface filterTypePrpos {
  name: string;
}
const filterOptions: filterTypePrpos[] = [
  { name: 'Newest' },
  { name: 'Oldest' },
];
interface TableProps {
  data: RegisterListProps[];
  loading: boolean;
}
export default function Table({ data, loading }: TableProps) {
  const {
    data: tableData,
    search,
    setSearch,
    // sorted,
    // setSorted,
    // sortOrder,
    // setSortedOrder,
  } = useTable({ data });

  const [filterShow, setFilterShow] = useState(false);
  const [roleShow, setRoleShow] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);

  const handleFilterShow = () => {
    setFilterShow(!filterShow);
  };

  const handleRoleShow = () => {
    setRoleShow(!roleShow);
  };

  const filterTableData = tableData.filter((row) => {
    if (selectedRoles.length === 0) return true;
    return selectedRoles.includes(row.role);
  });
  return (
    <div className="w-full h-screen bg-[#020618] ">
      <div className="flex flex-col w-[90%] mx-auto">
        <div className="flex items-center justify-between mt-5">
          <div>
            <h1 className="text-3xl  lg:text-5xl font-bold text-[#FFFFFF]">
              Registered
            </h1>
            <div className="border-2 w-20 md:w-35 mt-1 border-[#FFBA00]"></div>
          </div>

          <div className="w-[35%] relative">
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search...."
              className="w-full  lg:w-122   bg-[#FFFFFF17] text-[#6A7282] focus:outline-none pt-2 pr-4 pb-2 pl-8 rounded-lg"
            />
            <div className="absolute top-2 left-3">
              <img src={Search} alt="" />
            </div>
          </div>
          <div className="flex justify-between items-center gap-10">
            <p className="text-[#FFFFFF]">total-200</p>

            <div className="flex relative">
              <button
                onClick={handleRoleShow}
                className="text-[#FFFFFF] flex cursor-pointer w-full lg:w-21.5 items-center bg-[#020618] py-2 px-3 border border-[#F3F4F6] gap-3 rounded-[28px]"
              >
                <span className="font-bold text-sm">Role</span>
                <img src={DownArrow} alt="" className="w-3" />
              </button>
              {roleShow === true ? (
                <div className="absolute top-15  w-46.75 bg-[#090E23]">
                  {roleOptions.map((item) => (
                    <div className="flex border p-1 gap-2 border-[#99A1AF] rounded-md text-[white]">
                      <input
                        type="checkbox"
                        checked={selectedRoles.includes(item.name)}
                        className="bg-[#090E23] h-5 w-5 mt-1 appearance-none border-0  items-center rounded  checked:border-white checked:after:content-['✔']"
                        onChange={(e) => {
                          if (e.target.checked) {
                            setSelectedRoles([...selectedRoles, item.name]);
                          } else {
                            setSelectedRoles(
                              selectedRoles.filter(
                                (role) => role !== item.name,
                              ),
                            );
                          }
                        }}
                      />
                      <p>{item.name}</p>
                    </div>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
            <div className="relative">
              <div
                className="text-[#FFFFFF] flex cursor-pointer w-full lg:w-21.5 items-center bg-[#020618] py-2 px-2 border border-[#F3F4F6] gap-1 rounded-[28px]"
                onClick={handleFilterShow}
              >
                <img src={Filter} className="w-4" alt="" />
                <span className="font-bold text-sm"> Filter</span>
              </div>
              {filterShow === true ? (
                <div className="absolute  right-2">
                  {filterOptions.map((item) => (
                    <p
                      onClick={() => setFilterShow(false)}
                      className="w-46 text-[#F9FAFB ] bg-[#020618] p-2 border border-[#99A1AF] text-[#F9FAFB] text-sm rounded-lg"
                    >
                      {item.name}
                    </p>
                  ))}
                </div>
              ) : (
                ''
              )}
            </div>
          </div>
        </div>
        <div className="w-full mt-10">
          <table className="w-full table-fixed border-collapse ">
            <thead>
              <tr className="border-b ">
                <th className="text-white    text-sm pl-3  font-medium text-left pb-5">
                  No
                </th>
                <th className="text-white text-sm font-medium text-left pl-8 pb-5">
                  Name
                </th>
                <th className="text-white  text-sm font-medium text-center pb-5">
                  Email
                </th>
                <th className="text-white text-sm font-medium text-center pb-5">
                  Phone
                </th>
                <th className="text-white text-sm font-medium text-left pb-5">
                  Telegram
                </th>
                <th className="text-white text-sm font-medium text-left pb-5">
                  Role
                </th>
              </tr>
            </thead>

            <tbody>
              {loading
                ? Array.from({ length: 5 }).map((_, i) => (
                    <TableSkeletonRow key={i} />
                  ))
                : filterTableData?.map((row, i) => (
                    <tr
                      key={i}
                      className=" border-b border-[#99A1AF] hover:bg-[#1A1F2B]"
                    >
                      <td className="text-white  p-2 pl-3 text-sm">{row.id}</td>
                      <td className="text-white flex p-2  gap-3 items-center text-sm">
                        <img
                          src={row.image}
                          alt=""
                          className="w-10 h-10 rounded-2xl"
                        />
                        {row.name}
                      </td>
                      <td className="text-white text-sm text-center">
                        {row.email}
                      </td>
                      <td className="text-white  text-sm text-center">
                        {row.phone}
                      </td>
                      <td className="text-white text-sm">{row.telegram}</td>
                      <td className="text-white text-sm">{row.role}</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
