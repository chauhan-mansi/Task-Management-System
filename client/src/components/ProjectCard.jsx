import { Card, CardContent, Typography } from "@mui/material";

const ProjectCard = ({ projectName }) => {
  return (
    <Card sx={{ backgroundColor: "#b3e5fc", p: 2 }}>
      <CardContent>
        <Typography variant="h6">{projectName}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
