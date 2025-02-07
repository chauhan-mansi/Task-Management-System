import { Box, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ mt: 2 }}>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 2,
          mt: 2,
        }}
      >
        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Total Tasks</Typography>
          <Typography variant="h4">24</Typography>
        </Paper>

        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Completed</Typography>
          <Typography variant="h4">15</Typography>
        </Paper>

        <Paper sx={{ p: 2, textAlign: "center" }}>
          <Typography variant="h6">Pending</Typography>
          <Typography variant="h4">9</Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default Dashboard;
