import Pagination from "@/components/ui/Pagination";
import ProjectCard from "@/components/ui/ProjectCard";
import React, { useState } from "react";

const ProjectListPage = () =>{
    const [curPage, setCurPage] = useState(1)
    
    return (
        <div className="flex flex-col min-h-[80vh]">
            <div className="flex-grow">
                <ProjectCard />
            </div>
            <div className="w-full flex justify-center">
                <Pagination currentPage={curPage} totalPages={99} onPageChange={(newPage) => setCurPage(newPage)} />
            </div>
        </div>
    )
}

export default ProjectListPage;