import { Box, Paper, Typography } from "@mui/material";

const Dashboard = () => {
  return (
    <Box sx={{ mt: 2, display: "flex", justifyContent: "left" }}>
      <Box
        sx={{
          display: "flex",
          gap: 2,
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        {[
          { label: "Total Tasks", value: 24 },
          { label: "Completed", value: 15 },
          { label: "Pending", value: 9 },
        ].map((item, index) => (
          <Paper
            key={index}
            sx={{
              p: 1,
              textAlign: "center",
              height: "65px",
              width: "300px", 
              transition: "transform 0.3s ease-in-out",
              "&:hover": {
                transform: "scale(1.1)", 
              },
            }}
          >
            <Typography variant="h6">{item.label}</Typography>
            <Typography variant="h5">{item.value}</Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Dashboard;
