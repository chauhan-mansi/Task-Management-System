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

export const createProject = async (projectData, token) => {
  try {
    const response = await axios.post(
      "http://localhost:3000/project",
      projectData,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,  
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error creating project:", error.response?.data || error);
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
