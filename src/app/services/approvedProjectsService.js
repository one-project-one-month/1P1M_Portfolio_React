import apiClient from "@/api/axios";

const API_ENDPOINTS = {
  APPROVED_IDEAS: "/portfolio/api/v1/approved-ideas",
};

export const fetchApprovedProjects = async ({ 
  page = 1, 
  size = 6, 
  sortBy = "" 
} = {}) => {
  try {
    // Backend uses 0-based page indexing
    const backendPage = page - 1;

    const params = {
      page: backendPage,
      size: size,
    };

    if (sortBy) {
      params.sortBy = sortBy;
    }

    const response = await apiClient.get(API_ENDPOINTS.APPROVED_IDEAS, { params });

    const backendData = response.data;
    
    // console.log('Backend Response:', backendData);
    
    return {
      success: backendData.success === 1,
      data: {
        projects: backendData.data.map(project => ({
          id: project.id,
          projectName: project.name,
          projectDetails: project.description,
          devName: project.devName,
          reactionCount: project.reactionCount,
          projectTypes: [...new Set(project.projectTypes || [])], // Remove duplicates
          status: project.status
        })),
        pagination: {
          currentPage: backendData.meta.currentPage, // Backend returns 1-based already (inconsistent with request param)
          totalPages: backendData.meta.totalPages,
          totalItems: backendData.meta.totalItems,
          itemsPerPage: size,
          hasNext: backendData.meta.currentPage < backendData.meta.totalPages,
          hasPrevious: backendData.meta.currentPage > 1
        }
      },
      message: backendData.message || "Approved projects fetched successfully"
    };

  } catch (error) {
    console.error("Error fetching approved projects:", error);
    
    // Return error in consistent format
    throw {
      success: false,
      message: error.response?.data?.message || error.message || "Failed to fetch approved projects",
      error: error.response?.data || error
    };
  }
};

export const searchApprovedProjects = async (searchTerm, options = {}) => {
  try {
    // Fetch all projects and filter client-side
    const response = await fetchApprovedProjects({
      page: options.page || 1,
      size: options.limit || 6,
      sortBy: options.sortBy
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    // Filter projects by search term
    const filteredProjects = response.data.projects.filter(project =>
      project.projectName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.projectDetails?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      project.devName?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return {
      success: true,
      data: {
        projects: filteredProjects,
        pagination: {
          ...response.data.pagination,
          totalItems: filteredProjects.length,
          totalPages: Math.ceil(filteredProjects.length / (options.limit || 6))
        }
      },
      message: `Found ${filteredProjects.length} projects matching "${searchTerm}"`
    };

  } catch (error) {
    console.error("Error searching approved projects:", error);
    throw {
      success: false,
      message: error.message || "Failed to search approved projects",
      error
    };
  }
};

export const filterApprovedProjects = async (projectType, options = {}) => {
  try {
    // Fetch all projects and filter client-side
    const response = await fetchApprovedProjects({
      page: options.page || 1,
      size: options.limit || 6,
      sortBy: options.sortBy
    });

    if (!response.success) {
      throw new Error(response.message);
    }

    // Filter projects by type
    const filteredProjects = response.data.projects.filter(project =>
      project.projectTypes.includes(projectType)
    );

    return {
      success: true,
      data: {
        projects: filteredProjects,
        pagination: {
          ...response.data.pagination,
          totalItems: filteredProjects.length,
          totalPages: Math.ceil(filteredProjects.length / (options.limit || 6))
        }
      },
      message: `Found ${filteredProjects.length} projects of type "${projectType}"`
    };

  } catch (error) {
    console.error("Error filtering approved projects:", error);
    throw {
      success: false,
      message: error.message || "Failed to filter approved projects",
      error
    };
  }
};

export const getProjectTypes = async () => {
  try {
    // TODO: Replace with actual backend endpoint when available
    const mockData = {
      success: true,
      data: [
        { id: 1, name: "Mobile App", value: "Mobile App" },
        { id: 2, name: "Web App", value: "Web App" },
        { id: 3, name: "Desktop App", value: "Desktop App" },
        { id: 4, name: "API/Backend", value: "API/Backend" },
        { id: 5, name: "DevOps", value: "DevOps" },
        { id: 6, name: "Data Science", value: "Data Science" },
        { id: 7, name: "Machine Learning", value: "Machine Learning" },
        { id: 8, name: "Blockchain", value: "Blockchain" },
      ],
      message: "Project types fetched successfully"
    };

    return mockData;

  } catch (error) {
    console.error("Error fetching project types:", error);
    throw {
      success: false,
      message: error.message || "Failed to fetch project types",
      error
    };
  }
};
