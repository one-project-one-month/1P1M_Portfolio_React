import Pagination from "@/components/ui/Pagination";
import ProjectIdeaCard from "@/components/ui/ProjectIdeaCard";
import Title from "@/components/ui/Title";
import { ProjectIdeaList } from "@/services/projectIdeaService";
import React, { useEffect, useState } from "react";

const ProjectListPage = () => {
  const [curPage, setCurPage] = useState(1);
  const [projects, setProjects] = useState([]);
  const [totalPages, setTotalPages] = useState(99);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("Popular");

  const fetchProjects = async (page = 1) => {
        try {
            setLoading(true);

            const data = await ProjectIdeaList(page,6);
            console.log(data);

            setTotalPages(data.totalPages || 1);  
            const sortedProjects = data?.sort((a, b) => b.reactions - a.reactions);
            setProjects(sortedProjects);

        } catch (error) {
            console.error("Error fetching projects:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
      const demoProjects = [
            { id:1,title: "ERP Management System", submittedByProfile: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=200", description: "Integrating business processes into one system. Helps manage sales, inventory, and accounting efficiently.", likestate: true, likecount: 5650, viewcount: 10200, postBy: "Kyaw Thura", tag: [1, 2], status: 2, },
            { id: 2,title: "E-Learning Platform", submittedByProfile: "https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg", description: "A platform for students and teachers to connect, share lessons, and track progress online.", likestate: true, likecount: 789, viewcount: 2350, postBy: "Aye Chan Moe", tag: [3, 4], status: 1, },
            { id: 3,title: "Inventory Tracker App", submittedByProfile: "https://images.pexels.com/photos/3773833/pexels-photo-3773833.jpeg", description: "Tracks inventory levels, orders, and deliveries for small businesses.", likestate: false, likecount: 320, viewcount: 1500, postBy: "Thazin Hnin", tag: [2, 5], status: 2, },
            {id: 4, title: "Online Booking System", submittedByProfile: "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg", description: "Manages hotel or event reservations with real-time availability updates.", likestate: true, likecount: 982, viewcount: 4120, postBy: "Nyan Lin Aung", tag: [1, 3], status: 1, },
            { id: 5,title: "Inventory Tracker App", submittedByProfile: "https://images.pexels.com/photos/3773833/pexels-photo-3773833.jpeg", description: "Tracks inventory levels, orders, and deliveries for small businesses.", likestate: false, likecount: 320, viewcount: 1500, postBy: "Thazin Hnin", tag: [2, 5], status: 2, },
            {id: 6, title: "Health Monitoring Dashboard", submittedByProfile: "https://images.pexels.com/photos/3183198/pexels-photo-3183198.jpeg", description: "Displays real-time health data collected from wearable devices.", likestate: false, likecount: 420, viewcount: 830, postBy: "May Hnin Wai", tag: [4, 5], status: 3, },
        ];

      setProjects(demoProjects);

        // fetchProjects(curPage);
    }, [curPage]);


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
      return (b.id || 0) - (a.id || 0); // Newest
    });

  return (
    <div className="flex flex-col min-h-[80vh]">
      <Title
        title="Project Idea Lists"
        showSearch={true}
        showFilter={true}
        searchPlaceholder="Search by project title"
        onSearchChange={(e)=>setSearchTerm(e.target.value)}
        filterOptions={["Popular", "Newest", "Oldest"]}
        onFilterChange={setFilter}
      />

      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
        {loading ? (
          <p className="text-center col-span-full text-gray-400">Loading projects...</p>
        ) : filteredProjects.length === 0 ? (
          <p className="text-center col-span-full text-gray-400">No projects found.</p>
        ) : (
          filteredProjects.map((proj) => (
            <ProjectIdeaCard
              key={proj.id}
              title={proj.title}
              submittedByProfile={proj.submittedByProfile}
              description={proj.description}
              likestate={proj.likestate}
              likecount={proj.likecount}
              viewcount={proj.viewcount}
              tag={proj.tag}
              postBy={proj.postBy}
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