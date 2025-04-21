import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Typography, Chip } from "@mui/material";
import { motion } from "framer-motion";

const ProjectCard = ({ project, title, description }) => {
  const [hover, setHover] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/projects/${project._id}`);
  };

  return (
    <motion.div
      className="relative bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden cursor-pointer transition-all duration-300 hover:shadow-xl font-poppins"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={handleClick}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
    >
      <div className="p-6">
        <div className="flex justify-between items-center mb-2">
          <Typography
            variant="h6"
            className="text-xl font-semibold text-gray-800 dark:text-gray-100 truncate"
          >
            {title}
          </Typography>
          <Chip
            label="Active"
            size="small"
            className="bg-blue-500 text-white text-xs font-medium"
            sx={{ height: "24px", borderRadius: "12px" }}
          />
        </div>

        <motion.div
          className="overflow-hidden"
          initial={{ height: 0, opacity: 0, marginTop: 0 }}
          animate={{
            height: hover ? "auto" : 0,
            opacity: hover ? 1 : 0,
            marginTop: hover ? "1rem" : 0,
          }}
          transition={{ duration: 0.3, ease: "easeOut" }}
        >
          <Typography
            variant="body2"
            className="text-gray-600 dark:text-gray-300 line-clamp-3"
          >
            {description}
          </Typography>
          <Typography
            variant="caption"
            className="text-blue-500 dark:text-blue-400 font-medium mt-2 inline-block hover:text-blue-600 dark:hover:text-blue-300 transition-colors duration-200"
          >
            Click to view details →
          </Typography>
        </motion.div>
      </div>

      <motion.div
        className="absolute inset-0 border-2 border-blue-500 dark:border-blue-400 rounded-2xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: hover ? 0.2 : 0 }}
        transition={{ duration: 0.3 }}
      />
    </motion.div>
  );
};

export default ProjectCard;