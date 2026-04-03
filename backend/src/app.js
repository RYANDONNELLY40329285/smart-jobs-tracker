import express from "express";
import cors from "cors";

import jobsRoutes from "./routes/jobs.js";
import analyticsRoutes from "./routes/analytics.js";

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("API running ");
});

app.use("/jobs", jobsRoutes);
app.use("/analytics", analyticsRoutes);

export default app; 