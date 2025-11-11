import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import FilterDropdown from "@/components/ui/Filter";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import Pagination from "@/components/ui/Pagination";
import projectImage from "@/assets/ProjectImage.png";

import {
  getAllProjectProfiles,
  reactToProject,
} from "@/services/projectPortfolioService";
import { useNavigate } from "react-router-dom";

function ProjectPortfolioList() {
  const filterOptions = ["Popular", "Newest", "Oldest"];
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const navigate = useNavigate();

  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000);
    return () => clearTimeout(handler);
  }, [query]);

  // Build sorting/filter params
  const getSortParams = () => {
    switch (selectedFilter) {
      case "Popular":
        return { sortField: "name", sortDirection: "asc" };
      case "Newest":
        return { sortField: "id", sortDirection: "desc" };
      case "Oldest":
        return { sortField: "id", sortDirection: "asc" };
      default:
        return { sortField: "name", sortDirection: "desc" };
    }
  };

  // Fetch projects
  const fetchProjects = async () => {
    try {
      const { sortField, sortDirection } = getSortParams();
      const data = await getAllProjectProfiles({
        page: currentPage - 1,
        size: 6,
        sortField,
        sortDirection,
        keyword: debouncedQuery,
      });

      console.log("✅ API Response:", data);
      setProjects(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (error) {
      console.error("❌ Error fetching projects:", error);
    }
  };

  useEffect(() => {
    fetchProjects();
  }, [debouncedQuery, currentPage, selectedFilter]);

  // React handler
  const handleReact = async (projectId) => {
    try {
      await reactToProject(projectId);
      console.log("👍 Reacted successfully to project:", projectId);
      // Optional: refresh list or increment like count locally
    } catch (error) {
      console.error("❌ Error reacting:", error);
    }
  };

  // Handlers for search/filter/pagination
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setCurrentPage(1);
  };

  const handleSelectFilter = (option) => {
    setSelectedFilter(option);
    setCurrentPage(1);
    setIsFilterOpen(false);
  };

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Header Section */}
      <div className="flex flex-row items-center w-full mt-6 mb-10">
        <h1 className="text-3xl font-bold text-[#FFFFFF] min-w-fit mr-5 ">
          <span className="border-b-[5px] border-[#FFBA00] rounded-md inline-block pb-1">
            Project
          </span>
          &nbsp;Portfolio Lists
        </h1>

        <div className="flex w-full justify-between">
          <SearchBar
            placeholder="Search by project title"
            onSearch={handleSearch}
            value={query}
            onChange={setQuery}
          />
          <div className="flex items-center ml-[100px] gap-3">
            <Button
              variant="purple_button"
              onClick={() => {
                navigate("/create-project");
              }}
              size="purple_button"
              className="w-[100px] bg-[#9C39FC]"
            >
              Create
            </Button>

            <FilterDropdown
              isOpen={isFilterOpen}
              onToggle={() => setIsFilterOpen((prev) => !prev)}
              onSelect={handleSelectFilter}
              filters={filterOptions}
              selected={selectedFilter}
            />
          </div>
        </div>
      </div>

      {/* Project Grid */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className="grid auto-rows-fr gap-4 
                        grid-cols-1 
                        sm:grid-cols-1 
                        md:grid-cols-2 
                        lg:grid-cols-3 
                       "
        >
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="w-full">
                <ProjectCard
                
                  image={project.projectPicUrl || projectImage}
                  title={project.name}
                  description={project.description}
                  initialLikes={project.reaction_count || 0}
                  initialViews={project.view_count || "0"}
                  onClickReact={handleReact}
                  project={project}
                />
              </div>
            ))
          ) : (
            <div className="col-span-full flex items-center justify-center py-12">
              <p className="text-white text-center text-lg">
                No projects found.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center gap-3 mt-10 mb-10">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default ProjectPortfolioList;
