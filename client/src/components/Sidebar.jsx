import { Box, Button, List, ListItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

const Sidebar = ({ toggleDrawer, open, handleToggle }) => {
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#e0e0e0",
        p: 2,
      }}
    >
      <IconButton onClick={toggleDrawer} color="primary">
        <MenuIcon />
      </IconButton>
      <Box display="flex" flexDirection="column" alignItems="center">
        <List>
          <ListItem button>
            <Button>HOME</Button>
          </ListItem>
          <ListItem button>
            <Button>TO DO</Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
