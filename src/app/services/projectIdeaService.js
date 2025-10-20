import api from "../api/axios";

export const createProjectIdea = async (projectData) => {
  const response = await api.post("/project-idea", projectData);
  return response.data;
};
