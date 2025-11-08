import DevProfile from "@/components/ui/DevProfile";
import Pagination from "@/components/ui/Pagination";
import Title from "@/components/ui/Title";
import { getDevProfiles } from "@/services/devProfileService";
import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useRef, useState, useMemo } from "react";
import { useNavigate } from "react-router-dom";

const ProjectListPage = () => {
  const [curPage, setCurPage] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [totalPages, setTotalPages] = useState(1);
  const [filter, setFilter] = useState("Popular");
  const navigate = useNavigate();
  const abortControllerRef = useRef(null);

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm.trim()), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Reset page when filter/search changes
  useEffect(() => {
    setCurPage(0);
  }, [debouncedSearch, filter]);

  // Determine sorting field and direction
  const { sortField, direction } = useMemo(() => {
    if (filter === "Popular") return { sortField: "", direction: "desc" };
    if (filter === "Newest") return { sortField: "", direction: "desc" };
    return { sortField: "", direction: "asc" };
  }, [filter]);

  const fetchDevProfileDatas = async (page, size, keyword, sortField, sortDirection) => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }
    abortControllerRef.current = new AbortController();

    const res = await getDevProfiles(
      { page, size, keyword, sortField, sortDirection },
      abortControllerRef.current.signal
    );

    setTotalPages(res?.meta?.totalPages || 1);
    return res.data || [];
  };

  // Query data with React Query
  const {
    data: DevProfileDatas = [],
    isLoading: devsLoading,
    isFetching: devsFetching,
  } = useQuery({
    queryKey: ["DevProfileDatas", curPage, debouncedSearch, sortField, direction],
    queryFn: () => fetchDevProfileDatas(curPage, 6, debouncedSearch, sortField, direction),
    keepPreviousData: true,
    staleTime: 1000 * 60,
  });

  const handleProfileView = (devId) => {
    const devData = DevProfileDatas.find((dev) => dev.dev_id === devId);
    console.log(devData);
    
    if (!devData) return;
    const username = devData.email.split("@")[0];
    navigate(`/profile/${username}`, { state: { devData } });
  };

  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Developer Profiles"
        showSearch
        showFilter
        searchPlaceholder="Search by developer name or skill"
        onSearchChange={(e) => setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      <div className="flex-grow">
        <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
          {devsLoading || devsFetching ? (
            <div className="col-span-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="animate-pulse bg-gray-800 rounded-xl h-[225px]"
                />
              ))}
            </div>
          ) : (
            DevProfileDatas.map((devProfile, idx) => (
              <DevProfile
                key={idx}
                devProfile={devProfile}
                viewProfile={() => handleProfileView(devProfile.dev_id)}
              />
            ))
          )}
        </div>
      </div>

      <div className="w-full flex justify-center">
        <Pagination
          currentPage={curPage}
          totalPages={totalPages}
          onPageChange={setCurPage}
        />
      </div>
    </div>
  );
};

export default ProjectListPage;
