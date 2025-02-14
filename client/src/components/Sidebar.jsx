import { Box, Button, List, ListItem, IconButton } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";

const Sidebar = ({ toggleDrawer }) => {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        width: 250,
        height: "100vh",
        backgroundColor: "#e0e0e0",
        p: 2,
      }}
    >
      <IconButton onClick={() => toggleDrawer(false)} color="primary">
        <MenuIcon />
      </IconButton>
      <Box display="flex" flexDirection="column" alignItems="center">
        <List>
          <ListItem button onClick={() => navigate("/home")}>
            <Button>HOME</Button>
          </ListItem>
          <ListItem button>
            <Button>TO DO</Button>
          </ListItem>
          <ListItem button onClick={() => navigate("/project1")}>
            <Button>Project 1</Button>
          </ListItem>
          <ListItem button>
            <Button>Project 2</Button>
          </ListItem>
          <ListItem button>
            <Button>Project 3</Button>
          </ListItem>
          <ListItem button>
            <Button>Project 4</Button>
          </ListItem>
        </List>
      </Box>
    </Box>
  );
};

export default Sidebar;
