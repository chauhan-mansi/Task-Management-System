import React, { useState } from "react";
import { Paper, Typography, Box } from "@mui/material";

const ProjectCard = ({ title, description }) => {
  const [hover, setHover] = useState(false);

  return (
    <Paper
      elevation={3}
      sx={{
        padding: 2,
        backgroundColor: "#b3e5fc",
        position: "relative",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.05)",
        },
      }}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Typography variant="h6">{title}</Typography>


      <Box
        sx={{
          marginTop: hover ? 1 : 0,
          opacity: hover ? 1 : 0,
          maxHeight: hover ? "60px" : "0px",
          overflow: "hidden",
          transition: "opacity 0.3s ease, max-height 0.3s ease",
        }}
      >
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </Box>
    </Paper>
  );
};

export default ProjectCard;
