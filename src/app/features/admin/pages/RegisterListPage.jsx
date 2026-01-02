  import RegisterList from "../components/RegisterList";
  import Pagination from "@/components/ui/Pagination";
  import { useEffect, useState } from "react";
  import { useOpomRegister } from "@/queries/useOpomRegister";
  import Title from "@/components/ui/Title";

  function RegisterListPage() {
    const [filter, setFilter] = useState("Popular");
    const [page, setPage] = useState(0);
    const [keyword, setKeyword] = useState("");
    const [sortDirection, setSortDirection] = useState("desc");
    const [searchTerm, setSearchTerm] = useState("");
    console.log(keyword);

    useEffect(() => {
      const timeout = setTimeout(() => {
        setKeyword(searchTerm);
        setPage(0); // reset page
      }, 500);

      return () => clearTimeout(timeout);
    }, [searchTerm]);
useEffect(() => {
  if (filter === "Newest") {
    setSortDirection("desc");
  } else {
    setSortDirection("asc");
  }
}, [filter]);
    const size = 6;
    const { data, isError,isLoading } = useOpomRegister({
      keyword,
      page,
      size,
      sortDirection,
      sortField: "name",
    });

    const totalPages = data?.meta?.totalPages || 0;
    console.log(totalPages);

    console.log(data?.data);

    console.log(filter);

    return (
      <div className="flex flex-col relative h-full">
        {/*    <div className="flex w-full justify-between items-center  text-white ">
        
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

    
          <div className="flex items-center justify-end gap-x-20 text-white w-5/12 ">
            <div>Total Count-{data?.meta?.totalItems}</div>

            <div>
              <Filter
              isOpen={true}
              onToggle={(prev)=>setIsOpen(!prev)}
              onSelect={(opt)=>{setSortDirection(opt)}}
              filters={filterList}
      
              
              />
            </div>
          </div>
        </div> */}

        <Title
          title="Registered"
          onCreate={false}
          showSearch={true}
          showFilter={true}
          searchPlaceholder="Search"
          onSearchChange={(e) => {
            setSearchTerm(e.target.value);
          }}
          filterOptions={["Newest", "Oldest"]}
          onFilterChange={setFilter}
        />

        <div className=" h-8/12">
          <RegisterList data={data?.data} error={isError} loading={isLoading} />
        </div>

        <div className="flex  justify-center mt-2 gap-y-1.5">
          <Pagination
            totalPages={totalPages}
            currentPage={page}
            onPageChange={(newPage) => setPage(newPage)}
          />
        </div>
      </div>
    );
  }

  export default RegisterListPage;
