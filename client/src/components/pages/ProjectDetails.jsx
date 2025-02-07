import React, { useState } from "react";
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
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";

const priorities = ["Low", "Medium", "High"];
const statuses = ["To Do", "In Progress", "Done"];

const ProjectDetails = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Design UI",
      reporter: "Mansi",
      assignee: "Bhavik",
      dueDate: "10-02-2025",
      estimatedTime: "4",
      priority: "High",
      status: "To Do",
    },
    {
      id: 2,
      title: "API Integration",
      reporter: "Mansi",
      assignee: "Ashish",
      dueDate: "10-02-2025",
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

  const toggleDrawer = () => setOpenDrawer(!openDrawer);
  const handleOpenDialog = () => setOpenDialog(true);
  const handleCloseDialog = () => setOpenDialog(false);

  const handleChange = (e) => {
    setNewTask({ ...newTask, [e.target.name]: e.target.value });
  };

  const handleAddTask = () => {
    setTasks([...tasks, { id: tasks.length + 1, ...newTask }]);
    handleCloseDialog();
  };

  const handleStatusChange = (id, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, status: newStatus } : task
      )
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Navbar toggleDrawer={toggleDrawer} />

      <Drawer open={openDrawer} onClose={toggleDrawer}>
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
          <Typography variant="h4">Project 1</Typography>
          <Fab color="primary" size="medium" onClick={handleOpenDialog}>
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
                  <b>Reporter</b>
                </TableCell>
                <TableCell>
                  <b>Assignee</b>
                </TableCell>
                <TableCell>
                  <b>Due Date</b>
                </TableCell>
                <TableCell>
                  <b>Estimated Time</b>
                </TableCell>
                <TableCell>
                  <b>Priority</b>
                </TableCell>
                <TableCell>
                  <b>Status</b>
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {tasks.map((task) => (
                <TableRow key={task.id}>
                  <TableCell>{task.title}</TableCell>
                  <TableCell>{task.reporter}</TableCell>
                  <TableCell>{task.assignee}</TableCell>
                  <TableCell>{task.dueDate}</TableCell>
                  <TableCell>{task.estimatedTime} hrs</TableCell>
                  <TableCell>{task.priority}</TableCell>
                  <TableCell>
                    <TextField
                      select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(task.id, e.target.value)
                      }
                    >
                      {statuses.map((status) => (
                        <MenuItem key={status} value={status}>
                          {status}
                        </MenuItem>
                      ))}
                    </TextField>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>

      
        <Dialog open={openDialog} onClose={handleCloseDialog}>
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
              InputLabelProps={{ shrink: true }}
              value={newTask.dueDate}
              onChange={handleChange}
            />
            <TextField
              label="Estimated Time (hrs)"
              name="estimatedTime"
              type="number"
              fullWidth
              value={newTask.estimatedTime}
              onChange={handleChange}
            />

            <TextField
              label="Priority"
              name="priority"
              select
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

            <TextField
              label="Status"
              name="status"
              select
              fullWidth
              value={newTask.status}
              onChange={handleChange}
            >
              {statuses.map((status) => (
                <MenuItem key={status} value={status}>
                  {status}
                </MenuItem>
              ))}
            </TextField>
          </DialogContent>

          <DialogActions>
            <Button onClick={handleCloseDialog} color="error">
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

export default ProjectDetails;
