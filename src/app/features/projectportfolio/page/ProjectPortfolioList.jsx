import React, { useState} from "react";
import { 
  reactToProject,
} from "@/features/projectportfolio/service/projectPortfolioService";
import { useNavigate } from "react-router-dom";
import Title from "@/components/ui/Title";

import ProjectSectionContainer from "../componets/ProjectSectionContainer";
import { useGetSortDirection } from "@/hooks/useGetSortDirection";


function ProjectPortfolioList() {
  const filterOptions = ["Popular", "Newest", "Oldest"];
  const [query, setQuery] = useState(null);
  const [sortDirection,setSortDirection]=useState(null);
  const selectedFilter="Newest";
 
  

  const navigate = useNavigate();



  

   const handleReact = async (projectId) => {
     try {
       await reactToProject(projectId);
       console.log("👍 Reacted successfully to project:", projectId);
       // Optional: refresh list or increment like count locally
     } catch (error) {
       console.error("❌ Error reacting:", error);
     }
  };



  const handlefilter=(filter)=>{
      
    const sortDir=useGetSortDirection(filter);

    if(sortDir) {
      setSortDirection(sortDir)
    }
        
  }


  const handleSearch=(value)=>{
      setQuery(value)
  }

  


  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
   
<Title
onCreate={()=>navigate("/create-project")}
showSearch
initSelectedFilter={selectedFilter}
title="Project Portfolio"
searchPlaceholder="Search By Projects"
onSearchChange={(e)=>handleSearch(e.target.value)}
filterOptions={filterOptions}
onFilterChange={handlefilter}
/>

     <ProjectSectionContainer keyword={query} sortDirection={sortDirection}  />

     
    </div>
  );
}

export default ProjectPortfolioList;
