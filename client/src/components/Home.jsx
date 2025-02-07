import { useState } from "react";
import { Box, Drawer } from "@mui/material";
import Typography from "@mui/material/Typography";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import ProjectCard from "./ProjectCard";

const Home = () => {
  const [open, setOpen] = useState(false);

  const toggleDrawer = () => {
    setOpen(!open);
  };

  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
      {/* Navbar */}
      <Navbar toggleDrawer={toggleDrawer} />

      {/* Sidebar Drawer */}
      <Drawer open={open} onClose={toggleDrawer}>
        <Sidebar toggleDrawer={toggleDrawer} />
      </Drawer>

      {/* Main Content */}
      <Box sx={{ flex: 1, p: 4, mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Mansi 😊
        </Typography>

        {/* Project Cards Grid */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 2,
            mt: 2,
          }}
        >
          {["Project 1", "Project 2", "Project 3", "Project 4"].map((name, index) => (
            <ProjectCard key={index} projectName={name} />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
