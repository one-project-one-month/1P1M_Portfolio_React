import React from "react";
import FormDropdown from "@/components/ui/FormDropdown";

function ApprovedIdeasHeader({
  searchInput,
  onSearchInput,
  onSearchSubmit,
  pagination,
  projectTypes,
  onFilterSelect,
}) {
  return (
    <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4 lg:gap-0 lg:justify-between mb-6 flex-shrink-0">
      <div className="flex-shrink-0 w-full lg:w-auto">
        <h1 className="text-xl md:text-2xl lg:text-3xl xl:text-4xl font-bold text-white relative">
          Approved Ideas List
          <div className="h-1 w-32 md:w-40 lg:w-1/2 bg-yellow-400 mt-2 rounded-full"></div>
        </h1>
      </div>

      <div className="flex-1 w-full lg:w-auto flex justify-start lg:justify-center lg:mx-4">
        <div className="w-full max-w-md lg:max-w-lg">
          <form onSubmit={onSearchSubmit} className="relative">
            <div className="relative">
              <svg
                className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Search by project title"
                value={searchInput}
                onChange={onSearchInput}
                className="pl-10 pr-4 py-2.5 w-full bg-[#1E2A3E] border border-white rounded-lg text-white placeholder-gray-400 focus:border-purple-500 focus:ring-1 focus:ring-purple-500 focus:outline-none text-sm"
              />
            </div>
          </form>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full lg:w-auto lg:flex-shrink-0">
        <div className="flex-shrink-0 order-2 sm:order-1">
          <span className="text-yellow-400 text-sm md:text-base lg:text-lg font-medium whitespace-nowrap">
            Total - {pagination.totalItems}
          </span>
        </div>

        <div className="w-full sm:w-48 md:w-52 order-1 sm:order-2">
          <FormDropdown
            placeholder="Filter by Platform"
            menuList={[
              { id: 0, name: "All Platforms", value: "" },
              ...projectTypes,
            ]}
            onChange={onFilterSelect}
            className="bg-[#1E2A3E] border border-white text-white text-sm rounded-full"
          />
        </div>
      </div>
    </div>
  );
}

export default ApprovedIdeasHeader;
