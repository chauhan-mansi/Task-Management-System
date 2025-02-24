import axios from "axios";

const API_BASE_URL = "http://localhost:3000/project";
const API_URL = "http://localhost:3000/task";

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

export const getTasksByProject = async (projectId, token) => {
  if (!projectId) {
    console.error("getTasksByProject: Missing projectId");
    return { success: false, message: "Project ID is required" };
  }
  try {
    const response = await fetch(`http://localhost:3000/task/${projectId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });
    console.log("Raw API response:", response);
    if (!response.ok) {
      throw new Error(`Failed to fetch tasks: ${response.status}`);
    }

    const data = await response.json();
    console.log(data, "data----");

    if (!data.success || !data.data) {
      throw new Error("Invalid API response format");
    }
    return { success: data.success, data: data.data };
  } catch (error) {
    console.error("Error fetching tasks:", error);
    return [];
  }
};

export const createTask = async (taskData, token) => {
  try {
    const response = await fetch("http://localhost:3000/task", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(taskData),
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error creating task:", error);
    return { success: false, message: "Error creating task" };
  }
};


export const deleteTask = async (taskId, token) => {
  try {
    const response = await fetch(`http://localhost:3000/task/${taskId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error deleting task:", error);
    return { success: false, message: "Failed to delete task" };
  }
};

export const updateTask = async (taskId, updatedData, token) => {
  try {
    const response = await fetch(`http://localhost:3000/task/${taskId}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error updating task:", error);
    return { success: false, message: "Failed to update task" };
  }
};

