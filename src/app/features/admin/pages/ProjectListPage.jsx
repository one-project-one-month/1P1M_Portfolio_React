import Pagination from "@/components/ui/Pagination";
import ProjectCardAdmin from "@/components/ui/ProjectCardAdmin";
import Title from "@/components/ui/Title";
import axios from "axios";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const ProjectListPage = () => {
    const [curPage, setCurPage] = useState(1);
    const [projects, setProjects] = useState([]);
    const [totalPages, setTotalPages] = useState(99);
    const [isApproveLoading, setIsApproveLoading] = useState(null);
    const [isRejectLoading, setIsRejectLoading] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(null);
    const [loadingProject, setLoadingProject] = useState(null); 
    const [searchTerm, setSearchTerm] = useState("");
    const [filter, setFilter] = useState("Popular");

    // Example demo projects (you can replace with API data)
    useEffect(() => {
        const demoProjects = [
            { id: 1, title: "ERP Management System", submittedByProfile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", description: "Integrating business processes into one system. Helps manage sales, inventory, and accounting efficiently.", likestate: true, likecount: 5690, viewcount: 10200, postBy: "Kyaw Thura", projectType: ["Mobile"], status: 2, },
            { id: 2, title: "E-Learning Platform", submittedByProfile: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", description: "A platform for students and teachers to connect, share lessons, and track progress online.", likestate: true, likecount: 789, viewcount: 2350, postBy: "Aye Chan Moe", projectType: [3, 4], status: 1, },
            { id: 3, title: "Inventory Tracker App", submittedByProfile: "https://images.pexels.com/photos/3773833/pexels-photo-3773833.jpeg", description: "Tracks inventory levels, orders, and deliveries for small businesses.", likestate: false, likecount: 320, viewcount: 1500, postBy: "Thazin Hnin", projectType: [2, 5], status: 2, },
            { id: 4, title: "Online Booking System", submittedByProfile: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", description: "Manages hotel or event reservations with real-time availability updates.", likestate: true, likecount: 982, viewcount: 4120, postBy: "Nyan Lin Aung", projectType: [1, 3], status: 1, },
            { id: 5, title: "Health Monitoring Dashboard", submittedByProfile: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg", description: "Displays real-time health data collected from wearable devices.", likestate: false, likecount: 420, viewcount: 830, postBy: "May Hnin Wai", projectType: [4, 5], status: 3, },
            { id: 6, title: "Health Monitoring Dashboard", submittedByProfile: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg", description: "Displays real-time health data collected from wearable devices.", likestate: false, likecount: 420, viewcount: 830, postBy: "May Hnin Wai", projectType: [4, 5], status: 3, },
        ];
        setProjects(demoProjects);
    }, []);


    const fetchProjects = async (page = 1) => {
        try {
            setLoadingProject(true);

            const response = await axios.get(`/api/projects?page=${page}&limit=6`);
            const data = await response.data;
            console.log(data);

            setTotalPages(data.totalPages || 1);

            const sortedProjects = data.sort((a, b) => b.reactions - a.reactions);
            setProjects(sortedProjects);

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoadingProject(false);
        }
    };

    useEffect(() => {
        fetchProjects(curPage);
    }, [curPage]);



    // 🔍 Filter + Search logic
    const filteredProjects = projects
        .filter((proj) => {
            const projectName = proj.name || proj.title || "";
            const projectDesc = proj.description || "";
            return (
                projectName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                projectDesc.toLowerCase().includes(searchTerm.toLowerCase())
            );
        })
        .sort((a, b) => {
            const reactionsA = a.reactions || a.likecount || 0;
            const reactionsB = b.reactions || b.likecount || 0;

            if (filter === "Popular") return reactionsB - reactionsA;
            if (filter === "Oldest") return (a.id || 0) - (b.id || 0);
            return (b.id || 0) - (a.id || 0); 
        });

    const handleSearchChange = (e) => {
        setSearchTerm(e.target.value);
    };

    const handleFilterChange = (option) => {
        setFilter(option);
    };

    const handleReject = async (projectId) => {
        
        console.log("Rejected project:", projectId);
        console.log("=== BUTTON CLICKED - CALLING API ===");
        
        setIsRejectLoading(projectId);
        try {
            // await APICALL(projectId);
            setTimeout(() => {
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} approved successfully`);
                setIsRejectLoading(null);
            }, 1000);
        } catch (error) {
            console.error("Error approving project:", error);
            setIsRejectLoading(null);
        }
    };

     const handleApprove = async (projectId) => {
        console.log("Approved project:", projectId);
        console.log("=== BUTTON CLICKED - CALLING API ===");

        setIsApproveLoading(projectId);
       try {
            // await APICALL(projectId);
            setTimeout(() => {
                setProjects((prev) => prev.filter((p) => p.id !== projectId));
                toast.success(`Project ${projectId} approved successfully`);
                setIsApproveLoading(null);
            }, 1000);
        } catch (error) {
            console.error("Error approving project:", error);
            setIsApproveLoading(null);
        }
    };


    const handleLike = (projectId, liked) => {
        console.log(`${liked ? "Unliked" : "Liked"} project:`, projectId);

        setProjects(prev =>
            prev.map(p =>
                p.id === projectId
                    ? { ...p, likecount: liked ? p.likecount - 1 : p.likecount + 1, likestate: !liked }
                    : p
            )
        );

        try {
            console.log(`API called for project ${projectId}`);
        } catch (error) {
            console.error("Error updating like:", error);
            setProjects(prev =>
                prev.map(p =>
                    p.id === projectId
                        ? { ...p, likecount: liked ? p.likecount + 1 : p.likecount - 1, likestate: liked }
                        : p
                )
            );
        }
    };


    return (
        <div className="flex flex-col min-h-[80vh]">
            <Title
                title="Project Idea Lists"  
                showSearch={true}
                showFilter={true}
                searchPlaceholder="Search by project title"
                onSearchChange={handleSearchChange}
                filterOptions={["Popular", "Newest", "Oldest"]}
                onFilterChange={handleFilterChange}
            />

            <div className=" flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
                {loadingProject ? (
                    <p className="text-center col-span-full text-gray-400">Loading projects...</p>
                ) : filteredProjects.length === 0 ? (
                    <p className="text-center col-span-full text-gray-400">No projects found.</p>
                ) : (
                    filteredProjects.map((proj) => (
                        <ProjectCardAdmin
                            key={proj.id}
                            projectId={proj.id}
                            title={proj.title}
                            description={proj.description}
                            submittedByProfile={proj.submittedByProfile}
                            postBy={proj.postBy}
                            likeCount={proj.likecount}
                            viewCount={proj.viewcount}
                            liked={proj.likestate}
                            tags={proj.projectType}
                            onLike={() => handleLike(proj.id, proj.likestate)}
                            onApprove={() => handleApprove(proj.id)}
                            approveLoading={isApproveLoading === proj.id}
                            rejectLoading={isRejectLoading === proj.id}
                            onReject={() => handleReject(proj.id)}
                            onRejectClick = {(id) => setIsModalOpen(id)}
                            isRejectModalOpen= {isModalOpen === proj.id}
                        />
                    ))
                )}
            </div>

            <div className="w-full flex justify-center">
                <Pagination
                    currentPage={curPage}
                    totalPages={totalPages}
                    onPageChange={(newPage) => setCurPage(newPage)}
                />
            </div>
        </div>
    );
};

export default ProjectListPage;

