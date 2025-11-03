import apiClient from "@/api/axios";

const API_ENDPOINTS = {
  APPROVED_IDEAS: "/portfolio/api/v1/approved-ideas",
};

export const fetchApprovedProjects = async ({ 
  page = 0, 
  size = 6, 
  sortBy = "", 
  search = ""    
} = {}) => {
  try {

    const params = {
      page: page,
      size,
    };

    if (sortBy) params.sortField = sortBy;
    if (search) params.keyword = search; 

    const response = await apiClient.get("/portfolio/api/v1/approved-ideas", { params });
    const backendData = response.data;

    return {
      success: backendData.success === 1,
      data: {
        projects: backendData.data.map((project) => ({
          id: project.id,
          projectName: project.name,
          projectDetails: project.description,
          profilePictureUrl: project.profilePictureUrl,
          projectTypes: project.projectTypes,
          devName: project.devName,
          devId: project.dev_id,
          reactionCount: project.reactionCount,
          reactedProjects: project.reactedProjects,
          status: project.status,
        })),
        pagination: {
          currentPage: backendData.meta.currentPage,
          totalPages: backendData.meta.totalPages,
          totalItems: backendData.meta.totalItems,
          itemsPerPage: size,
          hasNext: backendData.meta.currentPage < backendData.meta.totalPages,
          hasPrevious: backendData.meta.currentPage > 1,
        },
      },
      message: backendData.message || "Approved projects fetched successfully",
    };
  } catch (error) {
    console.error("Error fetching approved projects:", error);
    throw {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch approved projects",
      error: error.response?.data || error,
    };
  }
};



export const searchApprovedProjects = async (searchTerm, options = {}) => {
  try {
    const response = await fetchApprovedProjects({
      page: options.page || 1,
      size: options.limit || 6,
      sortBy: options.sortBy,
    });

    if (!response.success) throw new Error(response.message);

    const term = searchTerm.toLowerCase();
    const filteredProjects = response.data.projects.filter(project =>
      project.projectName?.toLowerCase().includes(term) ||
      project.projectDetails?.toLowerCase().includes(term) ||
      project.devName?.toLowerCase().includes(term)
    );

    return {
      success: true,
      data: {
        projects: filteredProjects,
        pagination: {
          ...response.data.pagination,
          totalItems: filteredProjects.length,
          totalPages: Math.ceil(filteredProjects.length / (options.limit || 6)),
        },
      },
      message: `Found ${filteredProjects.length} projects matching "${searchTerm}"`,
    };

  } catch (error) {
    console.error("Error searching approved projects:", error);
    return {
      success: false,
      message: error.message || "Failed to search approved projects",
      error,
    };
  }
};
