import { Card, CardContent, Typography } from "@mui/material";

const ProjectCard = ({ projectName }) => {
  return (
    <Card sx={{ backgroundColor: "#80deea" }}>
      <CardContent>
        <Typography variant="h6">{projectName}</Typography>
      </CardContent>
    </Card>
  );
};

export default ProjectCard;
