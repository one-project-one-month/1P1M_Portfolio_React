import { filterIconUrl } from "@/assets/icons/iconUrls";
import Filter from "@/components/ui/Filter";
import SearchInput from "@/components/ui/SearchInput";
import TechStack from "@/constants/TechStack";
import RegisterList from "../components/RegisterList";
import Pagination from "@/components/ui/Pagination";
import { useEffect, useState } from "react";
import FilterDropdown from "@/components/ui/Filter";
import { useOpomRegister } from "@/queries/useOpomRegister";

function RegisterListPage() {
  const [page, setPage] = useState(0);
  const [keyword, setKeyword] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  console.log(keyword);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setKeyword(searchTerm);
      setPage(0); // reset page
    }, 400);

    return () => clearTimeout(timeout);
  }, [searchTerm]);

  const size = 8;
  const { data, isLoading, isError } = useOpomRegister({
    keyword,
    page,
    size,
    sortDirection: "desc",
    sortField: "name",
  });

  const totalPages = data?.meta?.totalPages || 0;

  console.log(data);

  const filterList = ["Newest", "Oldest"];

  return (
    <div className="flex flex-col relative h-full">
      <div className="flex w-full justify-between items-center  text-white ">
        {/* Title & Searchbar */}
        <div className="flex items-center  w-7/12  justify-between">
          <div className="text-5xl font-bold underline-offset-8 text-white">
            Registered
            <div className="max-w-32 mt-3.5 h-1.5 bg-yellow-500" />
          </div>
          <SearchInput
            value={searchTerm}
            placeholder={`Search`}
            className={`w-[487px]`}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>

        {/* Filter & total count */}
        <div className="flex items-center justify-end gap-x-20 text-white w-5/12 ">
          <div>Total Count-{data?.meta?.totalItems}</div>

          <div>
            <Filter
              icon={filterIconUrl}
              menuList={filterList}
              placeholder={`Filter`}
            />
          </div>
        </div>
      </div>

      <div className=" h-8/12">
        <RegisterList />
      </div>

      <div className="flex justify-center mt-2 gap-y-1.5">
        {/* <Pagination totalPages={totalPages} currentPage={currentPage} /> */}
      </div>
    </div>
  );
}

export default RegisterListPage;
