const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const userRoutes = require("./model/user/user.routes");
const projectRoutes = require("./model/project/project.routes");
const taskRoutes = require("./model/task/task.routes");


const app = express();
app.use(cors());
dotenv.config();
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/user", userRoutes);
app.use("/project", projectRoutes);
app.use("/task", taskRoutes);

app.listen(port, () => {
  connectDB();
  console.log(`Server Running on port:${port}`);
});
