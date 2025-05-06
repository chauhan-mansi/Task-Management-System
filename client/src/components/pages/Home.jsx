import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaPlus,
  FaTrash,
  FaTasks,
  FaExclamationCircle,
  FaTimes,
} from "react-icons/fa";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ProjectCard from "../ProjectCard";
import Dashboard from "../Dashboard";
import { getProjects, createProject, deleteProject } from "../../api";
import { motion, AnimatePresence } from "framer-motion";
import mainImage from "../../assets/main.jpg"; 

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [maxTeamSize, setMaxTeamSize] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dashboardOpen, setDashboardOpen] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState(null);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      if (!token) {
        navigate("/login");
        return;
      }
      setLoading(true);
      setError("");
      try {
        const projectList = await getProjects(token);
        setProjects(projectList);
      } catch (error) {
        console.error(
          "Error fetching projects:",
          error.response?.data || error
        );
        setError(error.response?.data?.message || "Failed to load projects.");
      } finally {
        setLoading(false);
      }
    };
    fetchProjects();
  }, [navigate, token]);

  const handleAddProject = async () => {
    if (!projectName.trim() || !description.trim() || !maxTeamSize.trim()) {
      setError("Project Name, Description, and Team Size are required.");
      return;
    }

    const decodedToken = JSON.parse(atob(token.split(".")[1]));
    const userId = decodedToken?.id;

    if (!userId) {
      setError("Invalid token. Please log in again.");
      navigate("/login");
      return;
    }

    const projectData = {
      name: projectName,
      description,
      maxTeamSize: parseInt(maxTeamSize, 10),
      user: userId,
    };

    setLoading(true);
    setError("");
    try {
      const newProject = await createProject(projectData, token);
      if (newProject?.success && newProject?.project) {
        setProjects((prev) => [...prev, newProject.project]);
        setProjectName("");
        setDescription("");
        setMaxTeamSize("");
        setDialogOpen(false);
      } else {
        setError(newProject?.message || "Failed to create project.");
      }
    } catch (error) {
      console.error("Error creating project:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to create project.");
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteProject = async (projectId) => {
    setLoading(true);
    setError("");
    try {
      await deleteProject(projectId, token);
      setProjects((prev) =>
        prev.filter((project) => project._id !== projectId)
      );
      setDeleteConfirm(null);
    } catch (error) {
      console.error("Error deleting project:", error.response?.data || error);
      setError(error.response?.data?.message || "Failed to delete project.");
    } finally {
      setLoading(false);
    }
  };

  const toggleDrawer = (newOpen) => {
    setDrawerOpen(newOpen);
  };

  const handleDialogOpen = () => {
    setDialogOpen(true);
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setProjectName("");
    setDescription("");
    setMaxTeamSize("");
    setError("");
  };

  const handleDashboardOpen = () => {
    setDashboardOpen(true);
  };

  const handleDashboardClose = () => {
    setDashboardOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setProjectName(value);
    if (name === "description") setDescription(value);
    if (name === "maxTeamSize") setMaxTeamSize(value);
    setError("");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-200 dark:from-gray-900 dark:to-gray-800 font-poppins">
      <header className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Task Management
            </h2>
          </div>
        </div>
      </header>

      <div
        className={`fixed inset-y-0 left-0 w-64 bg-white dark:bg-gray-800 shadow-xl transform ${
          drawerOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 mt-16`}
      >
        <Sidebar toggleDrawer={toggleDrawer} />
      </div>

      <main>
        <section className="px-6 py-20 md:py-32 bg-gradient-to-br from-blue-100 via-purple-100 to-gray-100 dark:from-gray-800 dark:via-gray-900 dark:to-blue-900 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-900/20 dark:to-purple-900/20"></div>
          <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between space-y-10 md:space-y-0 relative z-10">
            <motion.div
              className="md:w-1/2"
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight text-gray-900 dark:text-gray-100 tracking-tight drop-shadow-md">
                Manage Your Projects <br className="hidden md:block" />
                with{" "}
                <span className="text-blue-600 dark:text-blue-400">Ease</span>
              </h1>
              <p className="text-xl mb-8 text-gray-700 dark:text-gray-200 font-medium tracking-wide">
                Streamline tasks, collaborate seamlessly, and track progress
                with precision.
              </p>
              <motion.button
                onClick={handleDashboardOpen}
                className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-8 py-3 rounded-lg shadow-lg transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                View Dashboard
              </motion.button>
            </motion.div>

            <motion.div
              className="md:w-1/2 relative"
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src={mainImage} 
                alt="Task Management"
                className="rounded-lg shadow-xl w-full object-cover h-64 md:h-96"
              />
              {/* <div className="absolute inset-0 bg-black bg-opacity-10 rounded-lg"></div> */}
            </motion.div>
          </div>
        </section>

        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-between mb-8"
          >
            <h2 className="text-3xl font-bold text-gray-800 dark:text-gray-100 relative">
              Recent Projects
              <span className="absolute -bottom-2 left-0 w-16 h-1 bg-gradient-to-r from-blue-500 to-purple-500"></span>
            </h2>
            <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
              {projects.length} Project{projects.length !== 1 ? "s" : ""}
            </span>
          </motion.div>

          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mb-6 p-3 bg-red-100 text-red-700 rounded-lg flex items-center justify-center text-sm"
            >
              <FaExclamationCircle className="mr-2" />
              {error}
            </motion.div>
          )}

          {loading ? (
            <div className="text-center py-10">
              <svg
                className="animate-spin h-8 w-8 mx-auto text-blue-600"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
                ></path>
              </svg>
            </div>
          ) : projects.length === 0 ? (
            <div className="text-center py-10 text-gray-600 dark:text-gray-400">
              No projects yet. Create one to get started!
            </div>
          ) : (
            <motion.div
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              {projects.map((project) => (
                <motion.div
                  key={project._id}
                  className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-5 border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all duration-200"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.2 }}
                >
                  <ProjectCard
                    project={project}
                    title={project.name}
                    description={project.description}
                  />
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeleteConfirm(project._id);
                    }}
                    className={`mt-3 flex items-center text-red-600 hover:text-red-700 text-sm font-medium transition-colors duration-200 ${
                      loading ? "opacity-50 cursor-not-allowed" : ""
                    }`}
                  >
                    <FaTrash className="mr-1.5" /> Delete
                  </button>
                </motion.div>
              ))}
            </motion.div>
          )}
        </section>
      </main>

      <motion.button
        onClick={handleDialogOpen}
        className={`fixed top-20 right-6 p-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full shadow-lg hover:from-blue-600 hover:to-blue-700 transition-all duration-200 ${
          loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={loading}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
      >
        <FaPlus size={18} />
      </motion.button>

      <AnimatePresence>
        {dialogOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-md"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Add New Project
              </h3>
              <div className="space-y-4">
                <div className="relative">
                  <FaTasks className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                  <input
                    type="text"
                    name="title"
                    value={projectName}
                    onChange={handleChange}
                    placeholder="Project Title"
                    className="pl-10 w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={loading}
                  />
                </div>
                <div className="relative">
                  <textarea
                    name="description"
                    value={description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={loading}
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="maxTeamSize"
                    value={maxTeamSize}
                    onChange={handleChange}
                    placeholder="Max Team Size"
                    className="w-full p-2.5 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-200"
                    disabled={loading}
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  onClick={handleDialogClose}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddProject}
                  className={`px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:from-blue-600 hover:to-blue-700 hover:shadow-lg transition-all duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  Add Project
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}

        {dashboardOpen && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-4xl relative"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <button
                onClick={handleDashboardClose}
                className="absolute top-4 right-4 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100 transition-colors duration-200"
              >
                <FaTimes size={24} />
              </button>
              <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Dashboard Overview
              </h3>
              <div className="max-h-[80vh] overflow-y-auto">
                <Dashboard />
              </div>
            </motion.div>
          </motion.div>
        )}

        {deleteConfirm && (
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white dark:bg-gray-800 rounded-xl shadow-xl p-6 w-full max-w-sm"
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Confirm Deletion
              </h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6 text-sm">
                Are you sure you want to delete this project? This action cannot
                be undone.
              </p>
              <div className="flex justify-end space-x-3">
                <button
                  onClick={() => setDeleteConfirm(null)}
                  className="px-4 py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-200"
                  disabled={loading}
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleDeleteProject(deleteConfirm)}
                  className={`px-4 py-2 bg-red-600 text-white rounded-lg shadow-md hover:bg-red-700 hover:shadow-lg transition-all duration-200 ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Home;