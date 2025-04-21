import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  MenuItem,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Fab,
  Typography,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
import {
  getTasksByProject,
  createTask,
  updateTask,
  deleteTask,
} from "../../api";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { motion, AnimatePresence } from "framer-motion";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Done"];

const TaskPage = () => {
  const { projectId } = useParams();
  const [tasks, setTasks] = useState([]);
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    reporter: "",
    assignee: "",
    dueDate: "",
    estimatedHours: 0,
    priority: "Medium",
    status: "To Do",
  });

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      if (!projectId) {
        console.error("getTasksByProject: Missing projectId");
        return;
      }
      const response = await getTasksByProject(projectId, token);
      if (response.success) {
        setTasks(response.data);
      } else {
        console.error("Failed to fetch tasks:", response.message);
      }
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [projectId]);

  const toggleDrawer = (newOpen) => {
    setOpenDrawer(newOpen);
  };

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = async () => {
    if (!newTask.title.trim() || !newTask.description.trim()) {
      alert("Title and Description are required.");
      return;
    }
    if (!projectId) {
      console.error("Error: Project ID is missing.");
      alert("Project ID is required.");
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const taskData = { ...newTask, projectId };
      const response = await createTask(taskData, token);
      if (response?.success && response?.task) {
        const updatedTasks = await getTasksByProject(projectId, token);
        setTasks(updatedTasks);
        setNewTask({
          title: "",
          description: "",
          reporter: "",
          assignee: "",
          dueDate: "",
          estimatedHours: "",
          priority: "Medium",
          status: "To Do",
        });
        setOpenDialog(false);
      } else {
        alert(response?.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("Error creating task:", error);
      alert("Failed to create task. Please try again.");
    }
  };

  const handleDeleteTask = async (taskId) => {
    try {
      const token = localStorage.getItem("token");
      const response = await deleteTask(taskId, token);
      if (response && response.success) {
        setTasks((prev) => prev.filter((task) => task._id !== taskId));
      } else {
        alert(response.message || "Failed to delete task.");
      }
    } catch (error) {
      console.error("Error deleting task:", error);
      alert("Failed to delete task.");
    }
  };

  const handleUpdateTask = async (taskId, field, value) => {
    try {
      const token = localStorage.getItem("token");
      const updatedData = { [field]: value };
      const response = await updateTask(taskId, updatedData, token);
      if (response?.success) {
        setTasks((prevTasks) =>
          prevTasks.map((task) =>
            task._id === taskId ? { ...task, [field]: value } : task
          )
        );
      } else {
        alert(response?.message || "Failed to update task.");
      }
    } catch (error) {
      console.error("Error updating task:", error);
      alert("Network error: Failed to update task.");
    }
  };

  const getPriorityProgress = (priority) => {
    switch (priority) {
      case "High":
        return { width: "80%", color: "bg-red-500" };
      case "Medium":
        return { width: "50%", color: "bg-yellow-400" };
      case "Low":
        return { width: "20%", color: "bg-green-500" };
      default:
        return { width: "0%", color: "bg-gray-200" };
    }
  };

  return (
    <Box className="flex min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 font-inter">
      <Drawer
        open={openDrawer}
        onClose={() => setOpenDrawer(false)}
        classes={{ paper: "bg-white dark:bg-gray-800 shadow-2xl w-72" }}
      >
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      <Box className="flex-1 p-10 overflow-auto">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex justify-between items-center mb-12 max-w-7xl mx-auto"
        >
          <Typography
            variant="h4"
            className="text-5xl font-bold text-gray-900 dark:text-gray-100 relative"
          >
            Project Tasks
            <span className="absolute -bottom-2 left-0 w-24 h-1.5 bg-gradient-to-r from-blue-700 to-purple-700 rounded-lg"></span>
          </Typography>
          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
            <Fab
              color="primary"
              size="large"
              onClick={() => setOpenDialog(true)}
              className="bg-gradient-to-r from-blue-700 to-indigo-700 hover:from-blue-800 hover:to-indigo-800 transition-all duration-300 shadow-xl"
            >
              <AddIcon />
            </Fab>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          className="max-w-6xl mx-auto"
        >
          <div className="bg-gradient-to-r from-blue-50 to-gray-50 dark:from-gray-800 dark:to-gray-900 p-4 rounded-t-2xl shadow-md mb-2">
            <div className="flex items-center justify-start space-x-3 pl-6">
              <div className="w-3 h-3 bg-red-500 rounded-full"></div>
              <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            </div>
          </div>
          <TableContainer
            component={Paper}
            className="rounded-b-2xl shadow-2xl bg-white dark:bg-gray-800 overflow-x-auto border border-gray-200 dark:border-gray-700"
          >
            <Table className="w-full">
              <TableHead>
                <TableRow className="bg-gradient-to-r from-blue-100 to-gray-100 dark:from-gray-700 dark:to-gray-800">
                  {[
                    "Title",
                    "Description",
                    "Reporter",
                    "Assignee",
                    "Due Date",
                    "Est. Hours",
                    "Priority",
                    "Status",
                    "Actions",
                  ].map((header) => (
                    <TableCell
                      key={header}
                      className="px-8 py-4 text-lg font-bold text-gray-900 dark:text-gray-100 uppercase tracking-wide border-l border-r border-gray-300 dark:border-gray-600"
                    >
                      {header}
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                <AnimatePresence>
                  {tasks && tasks.length > 0 ? (
                    tasks.map((task) => {
                      const progress = getPriorityProgress(task.priority);
                      return (
                        <motion.tr
                          key={task._id}
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -20 }}
                          transition={{ duration: 0.4, ease: "easeOut" }}
                          className="text-gray-800 dark:text-gray-200"
                          whileHover={{
                            backgroundColor: "rgba(59, 130, 246, 0.1)",
                            boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                            transition: { duration: 0.3 },
                          }}
                        >
                          <TableCell className="px-8 py-8 text-lg font-medium text-gray-900 dark:text-gray-100 whitespace-nowrap border-l border-r border-gray-200 dark:border-gray-700">
                            {task.title || "N/A"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg text-gray-600 dark:text-gray-300 border-l border-r border-gray-200 dark:border-gray-700">
                            {task.description || "No description"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg text-gray-600 dark:text-gray-300 border-l border-r border-gray-200 dark:border-gray-700">
                            {task?.reporter?.name || "Unassigned"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg text-gray-600 dark:text-gray-300 border-l border-r border-gray-200 dark:border-gray-700">
                            {task?.assignee?.name || "Unassigned"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg text-gray-600 dark:text-gray-300 border-l border-r border-gray-200 dark:border-gray-700">
                            {task.dueDate
                              ? new Date(task.dueDate).toLocaleDateString()
                              : "No date"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg text-gray-600 dark:text-gray-300 border-l border-r border-gray-200 dark:border-gray-700">
                            {task.estimatedHours
                              ? `${task.estimatedHours} hrs`
                              : "N/A"}
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg">
                            <div className="flex items-center">
                              <span className="mr-3 text-sm font-medium text-gray-700 dark:text-gray-300">
                                {progress.width}
                              </span>
                              <div className="relative w-full max-w-[140px]">
                                <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-3.5 backdrop-blur-sm bg-opacity-70">
                                  <div
                                    className={`${progress.color} h-3.5 rounded-full`}
                                    style={{ width: progress.width }}
                                  ></div>
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg">
                            <motion.div whileHover={{ scale: 1.03 }}>
                              <TextField
                                select
                                value={task.status}
                                onChange={(e) =>
                                  handleUpdateTask(
                                    task._id,
                                    "status",
                                    e.target.value
                                  )
                                }
                                fullWidth
                                className="bg-white dark:bg-gray-700 rounded-xl shadow-md"
                                InputProps={{
                                  classes: {
                                    root: "text-gray-900 dark:text-gray-100 text-lg",
                                  },
                                }}
                              >
                                {statuses.map((status) => (
                                  <MenuItem key={status} value={status}>
                                    {status}
                                  </MenuItem>
                                ))}
                              </TextField>
                            </motion.div>
                          </TableCell>
                          <TableCell className="px-8 py-8 text-lg">
                            <motion.div
                              whileHover={{ scale: 1.1 }}
                              whileTap={{ scale: 0.9 }}
                            >
                              <Button
                                onClick={() => handleDeleteTask(task._id)}
                                className="text-red-600 hover:text-red-700 font-semibold text-lg transition-colors duration-200 flex items-center normal-case"
                              >
                                <FaTrash className="mr-2.5" /> Delete
                              </Button>
                            </motion.div>
                          </TableCell>
                        </motion.tr>
                      );
                    })
                  ) : (
                    <motion.tr
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ duration: 0.6, ease: "easeOut" }}
                    >
                      <TableCell
                        colSpan={9}
                        align="center"
                        className="text-gray-500 dark:text-gray-400 py-20 text-2xl"
                      >
                        No tasks available
                      </TableCell>
                    </motion.tr>
                  )}
                </AnimatePresence>
              </TableBody>
            </Table>
          </TableContainer>
        </motion.div>

        <AnimatePresence>
          {openDialog && (
            <Dialog
              open={openDialog}
              onClose={() => setOpenDialog(false)}
              classes={{
                paper:
                  "bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-[550px] p-4",
              }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6"
              >
                <DialogTitle className="text-4xl font-bold text-gray-900 dark:text-gray-100 border-b border-gray-200 dark:border-gray-700 pb-6 mb-6">
                  Add New Task
                </DialogTitle>
                <DialogContent className="flex flex-col gap-8">
                  <TextField
                    label="Task Title"
                    name="title"
                    fullWidth
                    value={newTask.title}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  />
                  <TextField
                    label="Task Description"
                    name="description"
                    fullWidth
                    value={newTask.description}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  />
                  <TextField
                    label="Reporter"
                    name="reporter"
                    fullWidth
                    value={newTask.reporter}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  />
                  <TextField
                    label="Assignee"
                    name="assignee"
                    fullWidth
                    value={newTask.assignee}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  />
                  <TextField
                    label="Due Date"
                    name="dueDate"
                    type="date"
                    fullWidth
                    value={newTask.dueDate}
                    onChange={handleChange}
                    InputLabelProps={{ shrink: true }}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                  />
                  <TextField
                    label="Estimated Hours"
                    name="estimatedHours"
                    type="number"
                    fullWidth
                    value={newTask.estimatedHours}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  />
                  <TextField
                    select
                    label="Priority"
                    name="priority"
                    fullWidth
                    value={newTask.priority}
                    onChange={handleChange}
                    className="bg-white dark:bg-gray-700 rounded-xl shadow-lg"
                    InputProps={{
                      classes: {
                        root: "text-gray-900 dark:text-gray-100 text-xl",
                      },
                    }}
                    InputLabelProps={{
                      classes: {
                        root: "text-gray-600 dark:text-gray-400 text-lg",
                      },
                    }}
                  >
                    {priorities.map((priority) => (
                      <MenuItem key={priority} value={priority}>
                        {priority}
                      </MenuItem>
                    ))}
                  </TextField>
                </DialogContent>
                <DialogActions className="p-6 flex justify-end gap-6">
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button
                      onClick={() => setOpenDialog(false)}
                      className="text-red-600 hover:text-red-700 font-semibold text-xl transition-colors duration-200"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="relative"
                  >
                    <Button
                      onClick={handleAddTask}
                      className="bg-gradient-to-r from-blue-700 to-indigo-700 text-white px-8 py-3 rounded-xl font-semibold text-xl transition-all duration-300 shadow-lg hover:shadow-xl before:absolute before:inset-0 before:bg-white/10 before:rounded-xl before:opacity-0 hover:before:opacity-100"
                    >
                      Add Task
                    </Button>
                  </motion.div>
                </DialogActions>
              </motion.div>
            </Dialog>
          )}
        </AnimatePresence>
      </Box>
    </Box>
  );
};

export default TaskPage;
