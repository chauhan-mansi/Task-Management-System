import { Box, Typography, Grid } from "@mui/material";
import Sidebar from "./Sidebar";
import ProjectCard from "./ProjectCard";

const Home = () => {
  return (
    <Box sx={{ display: "flex", height: "100vh", backgroundColor: "#f0f0f0" }}>
     
      <Sidebar />

   
      <Box sx={{ flex: 1, p: 4 }}>
        <Typography variant="h4" gutterBottom>
          Welcome, Mansi 😊
        </Typography>

        <Grid container spacing={2}>
          {["Project 1", "Project 2", "Project 3", "Project 4"].map((name, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <ProjectCard projectName={name} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default Home;
