import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaPlus, FaTasks, FaExclamationCircle } from "react-icons/fa";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Done"];

const ProjectDetails = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [error, setError] = useState("");
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design UI",
      reporter: "Mansi",
      assignee: "Bhavik",
      dueDate: "2025-02-10",
      estimatedTime: "4",
      priority: "High",
      status: "To Do",
    },
    {
      id: 2,
      title: "API Integration",
      reporter: "Mansi",
      assignee: "Ashish",
      dueDate: "2025-02-10",
      estimatedTime: "6",
      priority: "Medium",
      status: "In Progress",
    },
  ]);
  const [newTask, setNewTask] = useState({
    title: "",
    reporter: "",
    assignee: "",
    dueDate: "",
    estimatedTime: "",
    priority: "Medium",
    status: "To Do",
  });

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  const handleOpenDialog = () => setOpenDialog(true);

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setNewTask({
      title: "",
      reporter: "",
      assignee: "",
      dueDate: "",
      estimatedTime: "",
      priority: "Medium",
      status: "To Do",
    });
    setError("");
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
    setError("");
  };

  const handleAddTask = () => {
    if (
      !newTask.title.trim() ||
      !newTask.reporter.trim() ||
      !newTask.assignee.trim() ||
      !newTask.dueDate ||
      !newTask.estimatedTime.trim()
    ) {
      setError("All fields are required except Priority and Status.");
      return;
    }
    if (parseFloat(newTask.estimatedTime) <= 0) {
      setError("Estimated time must be a positive number.");
      return;
    }
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    handleCloseDialog();
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, status: newStatus } : task)));
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 font-poppins">

      <header className="bg-white dark:bg-gray-800 shadow-lg fixed w-full top-0 z-10">
        <div className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-3 flex items-center justify-between">
          <div className="flex items-center space-x-2 sm:space-x-3">
            <img src="/logo.png" alt="Task Management" className="h-8 sm:h-10" />
            <h2 className="text-lg sm:text-xl font-semibold text-gray-800 dark:text-gray-200 truncate">
              Task Management
            </h2>
          </div>
          <Navbar toggleDrawer={toggleDrawer} />
        </div>
      </header>

      <div
        className={`fixed inset-y-0 left-0 w-56 sm:w-64 bg-white dark:bg-gray-800 shadow-xl transform ${
          openDrawer ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out z-20 mt-12 sm:mt-14`}
      >
        <Sidebar toggleDrawer={toggleDrawer} />
      </div>

      <main className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-6 py-4 sm:py-6 mt-14 sm:mt-16">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-4 sm:mb-6 gap-2">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-800 dark:text-gray-200">Project 1</h1>
          <button
            onClick={() => navigate("/")}
            className="text-blue-600 hover:text-blue-700 text-xs sm:text-sm font-medium transition-colors duration-150"
          >
            Back to Projects
          </button>
        </div>

        {error && (
          <div className="mb-4 sm:mb-6 p-2.5 bg-red-100 text-red-700 rounded-md flex items-center justify-center text-xs sm:text-sm">
            <FaExclamationCircle className="mr-1.5 sm:mr-2" />
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-gray-800 rounded-xl shadow-md overflow-x-auto bg-gradient-to-br from-gray-50 to-white dark:from-gray-800 dark:to-gray-900">
          <table className="w-full min-w-[640px] border-collapse">
            <thead>
              <tr className="bg-gray-50 dark:bg-gray-700">
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Title
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Reporter
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Assignee
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Due Date
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Est. Time (hrs)
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Priority
                </th>
                <th className="px-3 sm:px-4 py-2 sm:py-3 text-left text-xs sm:text-sm font-semibold text-gray-800 dark:text-gray-200">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              {tasks.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="px-3 sm:px-4 py-4 sm:py-6 text-center text-gray-600 dark:text-gray-400 text-sm sm:text-base"
                  >
                    No tasks yet. Add one to get started!
                  </td>
                </tr>
              ) : (
                tasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className={`border-t border-gray-200 dark:border-gray-700 ${
                      index % 2 === 0 ? "bg-white dark:bg-gray-800" : "bg-gray-50 dark:bg-gray-700"
                    } hover:bg-gray-100 dark:hover:bg-gray-600 transition-colors duration-150`}
                  >
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.title}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.reporter}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.assignee}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.dueDate}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.estimatedTime}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3 text-gray-800 dark:text-gray-200 text-xs sm:text-sm">
                      {task.priority}
                    </td>
                    <td className="px-3 sm:px-4 py-2 sm:py-3">
                      <select
                        value={task.status}
                        onChange={(e) => handleStatusChange(task.id, e.target.value)}
                        className="w-full p-1.5 sm:p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-xs sm:text-sm"
                      >
                        {statuses.map((status) => (
                          <option key={status} value={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        <button
          onClick={handleOpenDialog}
          className="fixed top-16 sm:top-20 right-4 sm:right-6 p-2.5 sm:p-3 bg-blue-600 text-white rounded-full shadow-lg hover:bg-blue-700 hover:scale-102 transition-all duration-150"
        >
          <FaPlus size={16} className="sm:w-18 sm:h-18" />
        </button>

        {openDialog && (
          <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-30 transition-opacity duration-300">
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-4 sm:p-6 w-11/12 max-w-md transform transition-transform duration-150">
              <h3 className="text-base sm:text-lg font-semibold text-gray-800 dark:text-gray-200 mb-3 sm:mb-4">
                Add New Task
              </h3>
              <div className="space-y-3">
                <div className="relative">
                  <FaTasks className="absolute left-2.5 sm:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 text-sm sm:text-base" />
                  <input
                    type="text"
                    name="title"
                    value={newTask.title}
                    onChange={handleChange}
                    placeholder="Task Title"
                    className="pl-8 sm:pl-10 w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="reporter"
                    value={newTask.reporter}
                    onChange={handleChange}
                    placeholder="Reporter"
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <input
                    type="text"
                    name="assignee"
                    value={newTask.assignee}
                    onChange={handleChange}
                    placeholder="Assignee"
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <input
                    type="date"
                    name="dueDate"
                    value={newTask.dueDate}
                    onChange={handleChange}
                    placeholder="Due Date"
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  />
                </div>
                <div className="relative">
                  <input
                    type="number"
                    name="estimatedTime"
                    value={newTask.estimatedTime}
                    onChange={handleChange}
                    placeholder="Estimated Time (hrs)"
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                    min="0"
                  />
                </div>
                <div className="relative">
                  <select
                    name="priority"
                    value={newTask.priority}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  >
                    {priorities.map((priority) => (
                      <option key={priority} value={priority}>
                        {priority}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="relative">
                  <select
                    name="status"
                    value={newTask.status}
                    onChange={handleChange}
                    className="w-full p-2 sm:p-2.5 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-150 text-sm sm:text-base"
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="mt-4 sm:mt-6 flex justify-end gap-2">
                <button
                  onClick={handleCloseDialog}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 text-gray-600 dark:text-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors duration-150 text-sm sm:text-base"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddTask}
                  className="px-3 sm:px-4 py-1.5 sm:py-2 bg-blue-600 text-white rounded-md shadow-md hover:bg-blue-700 hover:shadow-lg hover:scale-102 transition-all duration-150 text-sm sm:text-base"
                >
                  Add Task
                </button>
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default ProjectDetails;