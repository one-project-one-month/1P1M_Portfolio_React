import Pagination from "@/components/ui/Pagination";
import ProjectCard from "@/components/ui/ProjectCard";
import React from "react";

const ProjectListPage = () =>{
    return (
        <div className="flex flex-col min-h-[80vh]">
            <div className="flex-grow">
                <ProjectCard />
            </div>
            <div className="w-full flex justify-center">
                <Pagination />
            </div>
        </div>
    )
}

export default ProjectListPage;