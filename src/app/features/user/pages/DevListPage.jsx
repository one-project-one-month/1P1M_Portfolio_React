import React, { useState, useEffect, useRef } from "react";
import DevCard from "../components/DevCard";
import SearchIcon from "@/assets/icons/search.png";
import { getDevProfiles } from "@/services/devProfileService";
import Pagination from "@/components/ui/Pagination";
import FilterDropdown from "@/components/ui/Filter";

export default function DevListPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState("");
  const [devProfiles, setDevProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [sortField, setSortField] = useState("name");
  const [sortDirection, setSortDirection] = useState("asc");
  const pageSize = 6;

  // Ref to track the current AbortController
  const abortControllerRef = useRef(null);

  // Debounced search effect - only updates debouncedSearchTerm after 500ms of no changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500); // Increased to 500ms for better debouncing

    return () => clearTimeout(timeoutId);
  }, [searchTerm]);

  // Reset to first page when search term actually changes (debounced)
  useEffect(() => {
    setCurrentPage(1);
  }, [debouncedSearchTerm]);

  useEffect(() => {
    const fetchProfiles = async () => {
      try {
        // Cancel any ongoing request
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
        }

        // Create new AbortController for this request
        abortControllerRef.current = new AbortController();

        setLoading(true);
        const params = {
          keyword: debouncedSearchTerm,
          page: currentPage - 1, // Backend expects 0-based pagination
          size: pageSize,
          sortField: sortField,
          sortDirection: sortDirection,
        };

        console.log("Making API call with params:", params);
        const data = await getDevProfiles(
          params,
          abortControllerRef.current.signal
        );

        // Only update state if request wasn't aborted
        if (!abortControllerRef.current.signal.aborted) {
          console.log("API Response Data:", data);

          const profiles = Array.isArray(data.data) ? data.data : [];
          setDevProfiles(profiles);

          // Set pagination meta data from backend response
          if (data.meta) {
            setTotalPages(data.meta.totalPages);
            setTotalItems(data.meta.totalItems);
          }
        }
      } catch (error) {
        // Don't log error if request was aborted
        if (error.name !== "AbortError") {
          console.error("Error fetching profiles", error);
        }
      } finally {
        // Only set loading to false if request wasn't aborted
        if (!abortControllerRef.current?.signal.aborted) {
          setLoading(false);
        }
      }
    };

    fetchProfiles();

    // Cleanup function to abort request on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, [debouncedSearchTerm, currentPage, sortField, sortDirection]);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Backend handles filtering and pagination, so we use profiles directly
  const currentMembers = devProfiles;

  return (
    <div className="w-[1296px] mx-auto py-6 min-h-screen flex flex-col">
      {/* <Navbar /> */}
      <div className="max-w-[1400px] mx-auto flex-grow w-full">
        <div className="flex items-center justify-between mb-10">
          <div>
            <h1 className="text-5xl font-bold text-[#FFFFFF]">Dev Profiles</h1>
            <div className="h-[6px] w-[53px] bg-[#FFBA00] mt-2"></div>
          </div>

          <div className="relative flex-1 items-center max-w-2xl mx-12">
            <img
              src={SearchIcon}
              alt="search"
              className="absolute left-3 top-3 w-[20px] h-[20px] cursor-pointer"
            />
            <input
              type="text"
              placeholder="Search your mate"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-[600px] h-[48px] bg-[#FFFFFF17] border border-[#FFFFFF26] rounded-lg py-3.5 pl-12 pr-4 text-sm text-[#6A7282] placeholder-slate-500 focus:outline-none focus:border-slate-600 focus:bg-slate-800/70 transition-all"
            />
          </div>

          {/* <button
                            onClick={() => setShowFilters(!showFilters)}
                            className="flex items-center gap-1 px-2 py-3.5 bg-transparent border border-[#F3F4F6] w-[99px] h-[40px] text-[#FAFAFA] rounded-full hover:bg-slate-800/50 hover:border-slate-500 transition-all"
                        >
                            <img
                                src={FilterIcon}
                                alt="filter"
                                className="w-[26px] h-[26px] cursor-pointer p-1"
                            />
                            <span className="font-medium">Filters</span>
                        </button> */}
          <FilterDropdown />
        </div>

        {/* Cards Grid */}
        <div className="w-full py-3">
          {loading ? (
            <p className="text-center text-gray-400 py-10">
              Loading profiles...
            </p>
          ) : currentMembers.length === 0 ? (
            <p className="text-center text-gray-500 py-10 text-lg">
              No developer profiles found.
            </p>
          ) : (
            <div className="grid grid-cols-3 gap-6">
              {currentMembers.map((member) => (
                <DevCard key={member.id || member._id} member={member} />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="w-full flex justify-center items-center mt-auto">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}
