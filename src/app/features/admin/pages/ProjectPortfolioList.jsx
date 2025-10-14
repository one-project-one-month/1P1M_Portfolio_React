import React, { useState } from "react";
import Navbar from "@/components/ui/Navbar";
import SearchBar from "@/components/ui/SearchBar";
import FilterDropdown from "@/components/ui/Filter";
import Button from "@/components/ui/Button";
import ProjectCard from "@/components/ui/ProjectCard";
import projectImage from "@/assets/ProjectImage.png";

function ProjectPortfolioList() {
    //SearchBar
    const [query, setQuery] = useState("");

    const handleSearch = (searchTerm) => {
        console.log("Search term:", searchTerm);
    };

    //Filter
    const handleToggleFilter = () => {
        setIsFilterOpen((prev) => !prev);
    };

    const [isFilterOpen, setIsFilterOpen] = useState(false);
    const handleSelectFilter = (option) => {
        console.log("Selected filter:", option);
        setIsFilterOpen(false);
    };

    //Project Portfolio Card
    //Buttons
    //Pagination

  return (
    <div>
      <div className="flex flex-col items-center justify-center w-full h-full px-10 py-2 bg-gray-500">
        {/* Navbar */}
        <Navbar/>

        {/* Header Section */}
        <div className="flex flex-col md:flex-row items-center w-full mt-6 mb-10 gap-4">
          <h1 className="text-3xl font-bold text-[#FFFFFF]">
            <span className="border-b-[5px] border-[#FFBA00] rounded-md inline-block pb-1">Project</span>&nbsp;Portfolio Lists
          </h1>

          <div className="flex flex-wrap justify-center items-center gap-4 ml-[20px]">
            <SearchBar
              placeholder="Search something..."
              onSearch={handleSearch}
              value={query}
              onChange={setQuery}
            />

            <div className="flex items-center ml-[90px] gap-4">
                <Button
                variant="purple_button"
                size="purple_button"
                className="w-[100px] bg-[#9C39FC]"
                >
                Create
                </Button>

                <FilterDropdown
                isOpen={isFilterOpen}
                onToggle={handleToggleFilter}
                onSelect={handleSelectFilter}
                />
            </div>

          </div>
        </div>

        {/* Project Grid */}
        <div className="grid w-full max-w-7xl grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-10 mx-auto">
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
          <ProjectCard
            image={projectImage}
            title="ERP Management System"
            description="A short description about the project that explains what it does and why it’s cool. Click see more to explore more about this project."
            initialLikes={526}
            initialViews="1.1k"
          />
        </div>

        {/* Static Pagination UI */}
        <div className="flex items-center justify-center gap-3 mt-10 mb-10">
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            &lt;
          </button>
          <button className="px-4 py-2 bg-[#9C39FC] text-white rounded-lg">
            1
          </button>
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            2
          </button>
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            3
          </button>
          <button className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200">
            &gt;
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProjectPortfolioList;