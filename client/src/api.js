import axios from "axios";

const API_BASE_URL = "http://localhost:3000/project"; 

const getAuthToken = () => localStorage.getItem("token"); 

export const getProjects = async () => {
  try {
    const token = getAuthToken();
    const response = await axios.get(API_BASE_URL, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data.data.projects;
  } catch (error) {
    console.error("Error fetching projects:", error);
    return [];
  }
};

export const createProject = async (projectData) => {
  try {
    const token = getAuthToken();
    const response = await axios.post(API_BASE_URL, projectData, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error);
    return null;
  }
};

export const deleteProject = async (projectId) => {
  try {
    const token = getAuthToken();
    const response = await axios.delete(`${API_BASE_URL}/${projectId}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (error) {
    console.error("Error deleting project:", error);
    return null;
  }
};
