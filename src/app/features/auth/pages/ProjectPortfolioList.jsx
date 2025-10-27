import React, { useState, useEffect } from "react";
import SearchBar from "@/components/ui/SearchBar";
import FilterDropdown from "@/components/ui/Filter";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import projectImage from "@/assets/ProjectImage.png";
import Pagination from "@/components/ui/Pagination";



function ProjectPortfolioList() {
  const filterOptions = ["Popular", "Newest", "Oldest"];

  // States
  const [query, setQuery] = useState("");
  const [projects, setProjects] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [selectedFilter, setSelectedFilter] = useState("Popular");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [debouncedQuery, setDebouncedQuery] = useState(query);

  const token = localStorage.getItem("token");

  
  // Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(query);
    }, 1000); // wait 500ms after typing stops

    return () => clearTimeout(handler); // cleanup if user keeps typing
  }, [query]);


  // Function to build API URL dynamically
  const buildApiUrl = () => {
    let baseUrl =
      "http://localhost:8080/portfolio/api/v1/project-portfolio/getAllProjectProfiles";

    // Default pagination & sorting
    let page = currentPage - 1; // API expects 0-based page
    let size = 6;
    let sortField = "name";
    let sortDirection = "desc";

    // Apply filter logic
    switch (selectedFilter) {
      case "Popular":
        sortField = "name";
        sortDirection = "asc";
        break;
      case "Newest":
        sortField = "id";
        sortDirection = "desc";
        break;
      case "Oldest":
        sortField = "id";
        sortDirection = "asc";
        break;
      default:
        break;
    }

    // Build query params
    const params = new URLSearchParams({
      page,
      size,
      sortField,
      sortDirection,
    });

    if (query.trim() !== "") {
      params.append("keyword", query.trim());
    }

    return `${baseUrl}?${params.toString()}`;
  };

  const fetchProjects = async () => {
    const url = buildApiUrl();
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      console.log("✅ API Response:", data);

      // Correctly extract from the API shape
      setProjects(data.data || []);
      setTotalPages(data.meta?.totalPages || 1);
    } catch (err) {
      console.error("❌ Error fetching projects:", err);
    }
  };


  // Fetch whenever debouncedQuery, filter, or page changes
  useEffect(() => {
    if (!token) {
      console.error("❌ No token found in localStorage!");
      return;
    }
    fetchProjects();
  }, [token, debouncedQuery, currentPage, selectedFilter]);

  // Search handler
  const handleSearch = (searchTerm) => {
    setQuery(searchTerm);
    setCurrentPage(1); // reset pagination
  };

  // Filter handler
  const handleSelectFilter = (option) => {
    setSelectedFilter(option);
    setCurrentPage(1); // reset pagination
    setIsFilterOpen(false);
  };

  // Pagination handler
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  //React the project with post
  const handleReact = async (projectId) => {
    try {
      const token = localStorage.getItem("token");

      const response = await fetch(
        `http://localhost:8080/portfolio/api/v1/project-portfolio/react?projectPortfolioId=${projectId}`,
        {
          method: "POST",
          headers: { "Authorization": `Bearer ${token}` },
        }
      );

      return response; // ✅ Return so the caller can inspect status
    } catch (error) {
      console.error("❌ Error reacting:", error);
      throw error;
    }
  };




  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      {/* Header Section */}
      <div className="flex flex-row items-center w-full mt-6 mb-10">
        <h1 className="text-3xl font-bold text-[#FFFFFF] ">
          <span className="border-b-[5px] border-[#FFBA00] rounded-md inline-block pb-1">
            Project
          </span>
          &nbsp;Portfolio Lists
        </h1>

        <div className="flex flex-row justify-center items-center ml-[20px]">
          <SearchBar
            placeholder="Search by project title"
            onSearch={handleSearch}
            value={query}
            onChange={setQuery}
          />

          <div className="flex items-center ml-[100px] gap-3">
            <Button
              variant="purple_button"
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
      <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mx-auto">
        {projects.length > 0 ? (
          projects.map((project) => (
            <ProjectCard
              key={project.id}
              image={project.projectPicUrl || projectImage}
              title={project.name}
              description={project.description}
              initialLikes={project.reaction_count || 0}
              initialViews={project.reaction_count || "0"} // or replace with actual view count if available
              
              onClickReact={handleReact}
              project={project}
            />
          ))
        ) : (
          <p className="text-white text-center col-span-3">
            No projects found.
          </p>
        )}
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



