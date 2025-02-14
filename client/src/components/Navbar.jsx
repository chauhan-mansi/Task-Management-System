import { AppBar, Toolbar, IconButton, Typography, Avatar, Box } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = ({ toggleDrawer }) => {
  return (
    <AppBar position="fixed">
      <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
      <IconButton color="inherit" onClick={() => toggleDrawer(true)} edge="start">
          <MenuIcon />
        </IconButton>

        <Typography variant="h6">Task Management System</Typography>

        <Avatar alt="User Profile" src="/profile.jpg" />
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
