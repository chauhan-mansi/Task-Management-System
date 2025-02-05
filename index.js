const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./model/user/user.routes");
const projectRoutes = require("./model/project/project.routes");
const subTaskRoutes = require("./model/subtask/subtask.routes");
const taskRoutes = require("./model/task/task.routes");

const app = express();
const port = process.env.PORT || 5000;
dotenv.config();
app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);
app.use("/subtask", subTaskRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running on port:${port}`);
});
