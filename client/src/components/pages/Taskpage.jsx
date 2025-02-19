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
import { useParams } from "react-router-dom";
import { getTasksByProject, createTask, deleteTask } from "../../api";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

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
  console.log(tasks, 'takss')

  const fetchTasks = async () => {
    try {
      const token = localStorage.getItem("token");
      console.log("Fetching tasks for project:", projectId);

      if (!projectId) {
        console.error("getTasksByProject: Missing projectId");
        return;
      }

      const response = await getTasksByProject(projectId, token);
      console.log(response.data, 'response')
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

      console.log("🚀 Sending task data:", taskData);

      const response = await createTask(taskData, token);

      if (response?.success && response?.task) {
        console.log("✅ Task created successfully:", response.task);
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
        console.error("❌ Invalid response from createTask:", response);
        alert(response?.message || "Failed to create task.");
      }
    } catch (error) {
      console.error("🔥 Error creating task:", error);
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

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Navbar toggleDrawer={toggleDrawer} />
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      <Box sx={{ p: 10, flexGrow: 1 }}>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 5,
          }}
        >
          <Typography variant="h4">Project Tasks</Typography>
          <Fab
            color="primary"
            size="medium"
            onClick={() => setOpenDialog(true)}
          >
            <AddIcon />
          </Fab>
        </Box>

        <TableContainer
          component={Paper}
          sx={{ width: "80%", mx: "auto", my: 3 }}
        >
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>
                  <b>Title</b>
                </TableCell>
                <TableCell>
                  <b>Description</b>
                </TableCell>
                <TableCell>
                  <b>Reporter</b>
                </TableCell>
                <TableCell>
                  <b>Assignee</b>
                </TableCell>
                <TableCell>
                  <b>Due Date</b>
                </TableCell>
                <TableCell>
                  <b>Estimated Hours</b>
                </TableCell>
                <TableCell>
                  <b>Priority</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
                <TableCell>
                  <b>Actions</b>
                </TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {tasks && tasks.length > 0 ? (
                tasks?.map((task) => (
                  <TableRow key={task._id}>
                    <TableCell>{task.title || "N/A"}</TableCell>
                    <TableCell>
                      {task.description || "No description"}
                    </TableCell>
                    <TableCell>{task?.reporter?.name || "Unassigned"}</TableCell>
                    <TableCell>{task?.assignee?.name || "Unassigned"}</TableCell>
                    <TableCell>
                      {task.dueDate
                        ? new Date(task.dueDate).toLocaleDateString()
                        : "No date"}
                    </TableCell>
                    <TableCell>
                      {task.estimatedHours
                        ? `${task.estimatedHours} hrs`
                        : "N/A"}
                    </TableCell>
                    <TableCell>{task.priority || "Low"}</TableCell>
                    <TableCell>{task.status || "Pending"}</TableCell>
                    <TableCell>
                      <Button
                        color="error"
                        onClick={() => handleDeleteTask(task._id)}
                      >
                        Delete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} align="center">
                    No tasks available
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>

        <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
          <DialogTitle>Add New Task</DialogTitle>
          <DialogContent
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              width: 400,
            }}
          >
            <TextField
              label="Task Title"
              name="title"
              fullWidth
              value={newTask.title}
              onChange={handleChange}
            />
            <TextField
              label="Task Description"
              name="description"
              fullWidth
              value={newTask.description}
              onChange={handleChange}
            />
            <TextField
              label="Reporter"
              name="reporter"
              fullWidth
              value={newTask.reporter}
              onChange={handleChange}
            />
            <TextField
              label="Assignee"
              name="assignee"
              fullWidth
              value={newTask.assignee}
              onChange={handleChange}
            />
            <TextField
              label="Due Date"
              name="dueDate"
              type="date"
              fullWidth
              value={newTask.dueDate}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Estimated Hours"
              name="estimatedHours"
              type="number"
              fullWidth
              value={newTask.estimatedHours}
              onChange={handleChange}
            />
            <TextField
              select
              label="Priority"
              name="priority"
              fullWidth
              value={newTask.priority}
              onChange={handleChange}
            >
              {priorities.map((priority) => (
                <MenuItem key={priority} value={priority}>
                  {priority}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setOpenDialog(false)} color="error">
              Cancel
            </Button>
            <Button onClick={handleAddTask} color="primary">
              Add Task
            </Button>
          </DialogActions>
        </Dialog>
      </Box>
    </Box>
  );
};

export default TaskPage;
