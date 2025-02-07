import { Box, Button, List, ListItem, ListItemText } from "@mui/material";

const Sidebar = ({ toggleDrawer }) => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#e0e0e0",
        p: 2,
      }}
    >
      <Button onClick={toggleDrawer} variant="contained" color="primary">
        Close
      </Button>
      <List>
        <ListItem button>
          <ListItemText primary="Home" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="To-Do" />
        </ListItem>
      </List>
    </Box>
  );
};

export default Sidebar;
