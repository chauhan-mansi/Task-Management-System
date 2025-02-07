import { Box, Button } from "@mui/material";

const Sidebar = () => {
  return (
    <Box sx={{ width: 200, backgroundColor: "#ddd", p: 2, height: "100vh" }}>
      <Button variant="contained" fullWidth sx={{ mb: 2 }}>Home</Button>
      <Button variant="contained" fullWidth>To Do</Button>
    </Box>
  );
};

export default Sidebar;
