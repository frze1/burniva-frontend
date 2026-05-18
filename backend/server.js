const express = require("express");
const cors = require("cors");
const sequelize = require("./src/config/database");
const authRoutes = require("./src/routes/authRoutes");
const userRoutes = require("./src/routes/userRoutes");
const dailyInputRoutes = require("./src/routes/dailyInputRoutes");
const predictionRoutes = require("./src/routes/predictionRoutes");
const dashboardRoutes = require("./src/routes/dashboardRoutes");
const historyRoutes = require("./src/routes/historyRoutes");
const todoRoutes = require("./src/routes/todoRoutes");
const errorMiddleware = require("./src/middleware/errorMiddleware");
require("./src/models");

require("dotenv").config();

const app = express();

app.use(cors({
  origin: process.env.FRONTEND_URL,
  credentials: true
}));
app.use(express.json());

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/user", userRoutes);
app.use("/api/v1/daily-input", dailyInputRoutes);
app.use("/api/v1/prediction", predictionRoutes);
app.use("/api/v1/dashboard", dashboardRoutes);
app.use("/api/v1/history", historyRoutes);
app.use("/api/v1/todos", todoRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({
    status: "success",
    message: "Burniva Backend Running 🚀"
  });
});

app.get("/", (req, res) => {
  res.send("Burniva Backend API Running 🚀");
});

app.use(errorMiddleware);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(async () => {

    console.log(
      "Database connected successfully ✅"
    );

    await sequelize.sync({
      alter: true
    });

    console.log(
      "Database synchronized ✅"
    );

    app.listen(PORT, () => {
      console.log(
        `Server running on port ${PORT}`
      );
    });

  })
  .catch((error) => {
    console.error("Database connection failed ❌");
    console.error(error);
  });
  