import Pagination from "@/components/ui/Pagination";
import ProjectCard from "@/components/ui/ProjectCard";
import Title from "@/components/ui/Title";
import React, { useEffect, useState } from "react";

const ProjectListPage = () =>{
    const [curPage, setCurPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(99);
    const [loading, setLoading] = useState(false);    
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Newest");

    // const fetchProjects = async (page = 1) => {
    //     try {
    //         setLoading(true);

    //         const response = await axios.get(`/api/projects?page=${page}&limit=6`);
    //         const data = await res.json();
    //         console.log(data);

    //         setTotalPages(data.totalPages || 1);  

    //         const sortedProjects = data.sort((a, b) => b.reactions - a.reactions);
    //         setProjects(sortedProjects);

    //     } catch (error) {
    //         console.error("Error fetching projects:", error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    // useEffect(() => {
    //     fetchProjects(curPage);
    // }, [curPage]);

    const handleCreate = () => {
        alert("Create button clicked!");
    };

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
        console.log("Search:", e.target.value);
    };

    const handleFilterChange = (option) => {
        setFilter(option);
        console.log("Selected Filter:", option);
    };

    return (
        <div className="flex flex-col min-h-[80vh]">
            <Title
                title="Project Idea Lists"
                onCreate={handleCreate}
                showSearch={true}
                showFilter={true}
                searchPlaceholder="Search by project title"
                onSearchChange={handleSearchChange}
                filterOptions={["Popular", "Newest", "Oldest"]}
                initSelectedFilter="Newest"
                onFilterChange={handleFilterChange}
            />
            <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {/* {loading ? (
                <p className="text-center col-span-full text-gray-400">Loading projects...</p>
                ) : projects.length === 0 ? (
                <p className="text-center col-span-full text-gray-400">No projects found.</p>
                ) : (
                projects.map((proj) => (
                    <ProjectCard
                    key={proj.id}
                    title={proj.name}
                    description={proj.description}
                    likestate={proj.likestate}
                    likecount={proj.likecount}
                    postBy={proj.name}
                    tag={proj.tag}
                    status={proj.approveStatus}
                    />
                ))
                )} */}

                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
                <ProjectCard />
            </div>
            <div className="w-full flex justify-center">
                <Pagination currentPage={curPage} totalPages={totalPages} onPageChange={(newPage) => setCurPage(newPage)} />
            </div>
        </div>
    )
}

export default ProjectListPage;