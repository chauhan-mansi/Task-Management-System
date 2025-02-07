import { useState } from "react";
import { Box, Drawer, Typography } from "@mui/material";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import ProjectCard from "../ProjectCard";
import Dashboard from "../Dashboard";
const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  const projects = [
    {
      title: "Project 1",
      description: "A system which will select best restaurant",
    },
    {
      title: "Project 2",
      description: "A collaborative tool to track progress and goals.",
    },
    {
      title: "Project 3",
      description:
        "A system in whcih food will be delieverd to you in 10 minutes",
    },
    {
      title: "Project 4",
      description: "Project management system for agile teams.",
    },
  ];

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
      <Navbar toggleDrawer={toggleDrawer} />

      <Drawer open={open} onClose={toggleDrawer}>
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
          {projects.map((project, index) => (
            <Box
              key={index}
              sx={{
                width: { xs: "100%", sm: "48%", md: "23%" },
              }}
            >
              <ProjectCard
                title={project.title}
                description={project.description}
              />
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
    </Box>
  );
};

export default Home;
