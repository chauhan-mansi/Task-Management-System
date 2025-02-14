import { useState, useEffect } from "react";
import {
  Box,
  Drawer,
  Typography,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Fab,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ProjectCard from "../ProjectCard";
import Dashboard from "../Dashboard";
import { getProjects, createProject, deleteProject } from "../../api";

const Home = () => {
  const [projects, setProjects] = useState([]);
  const [projectName, setProjectName] = useState("");
  const [description, setDescription] = useState("");
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchProjects = async () => {
      const data = await getProjects(token);
      setProjects(data);
    };
    fetchProjects();
  }, []);

  const handleAddProject = async () => {
    if (!projectName || !description) return;
    const newProject = await createProject(
      { name: projectName, description },
      token
    );
    if (newProject) {
      setProjects([...projects, newProject]);
      setProjectName("");
      setDescription("");
      setDialogOpen(false);
    }
  };

  const handleDeleteProject = async (id) => {
    const confirmDelete = window.confirm(
      "Do you really want to delete this project?"
    );
    if (confirmDelete) {
      const deleted = await deleteProject(id, token);
      if (deleted) {
        setProjects(projects.filter((project) => project._id !== id));
      }
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
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "title") setProjectName(value);
    if (name === "description") setDescription(value);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Navbar toggleDrawer={toggleDrawer} />

      <Drawer open={drawerOpen} onClose={() => toggleDrawer(false)}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      <Box sx={{ flex: 1, p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Mansi 😊
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 3,
            justifyContent: "space-between",
          }}
        >
          {projects.map((project) => (
            <Box
              key={project.id}
              sx={{
                width: { xs: "100%", sm: "48%", md: "23%" },
                cursor: "pointer",
              }}
              onClick={() => navigate(`/project/${project.id}`)}
            >
              <ProjectCard
                title={project.name}
                description={project.description}
              />
              <Button
                variant="contained"
                color="error"
                size="small"
                sx={{ mt: 1 }}
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteProject(project.id);
                }}
              >
                Delete
              </Button>
            </Box>
          ))}
        </Box>

        <Box sx={{ mt: 4 }}>
          <Typography variant="h5" gutterBottom>
            Dashboard Overview
          </Typography>
          <Dashboard />
        </Box>
      </Box>

      <Fab
        color="primary"
        size="medium"
        sx={{ position: "fixed", top: 85, right: 20 }}
        onClick={handleDialogOpen}
      >
        <AddIcon />
      </Fab>

      <Dialog open={dialogOpen} onClose={handleDialogClose}>
        <DialogTitle>Add New Project</DialogTitle>
        <DialogContent
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <TextField
            label="Project Title"
            name="title"
            value={projectName}
            onChange={handleChange}
            fullWidth
          />
          <TextField
            label="Description"
            name="description"
            value={description}
            onChange={handleChange}
            fullWidth
            multiline
            rows={2}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDialogClose} color="error">
            Cancel
          </Button>
          <Button onClick={handleAddProject} color="primary">
            Add Project
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default Home;
