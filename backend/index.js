const express = require("express");
const cors = require("cors");
require("dotenv").config();

const { initializeDatabase } = require("./db/db.connect");
const Job = require("./models/job.model");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// DB Connection
initializeDatabase();

/* ---------------- JOB ROUTES ---------------- */

// GET all jobs (with search by title)
app.get("/api/jobs", async (req, res) => {
  try {
    const { search } = req.query;

    const jobs = search
      ? await Job.find({
          title: { $regex: search, $options: "i" },
        })
      : await Job.find();

    res.json(jobs);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch jobs" });
  }
});

// GET job by ID
app.get("/api/jobs/:jobId", async (req, res) => {
  try {
    const job = await Job.findById(req.params.jobId);
    job ? res.json(job) : res.status(404).json({ error: "Job not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch job" });
  }
});

// POST a new job
app.post("/api/jobs", async (req, res) => {
  try {
    const body = Array.isArray(req.body) ? req.body : [req.body];
    const jobs = await Job.insertMany(body);

    res.status(201).json({
      message: "Job posted successfully",
      job: jobs,
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to post job" });
  }
});

// DELETE job by ID
app.delete("/api/jobs/:id", async (req, res) => {
  try {
    const deletedJob = await Job.findByIdAndDelete(req.params.id);

    deletedJob
      ? res.status(200).json({
          message: "Job deleted successfully",
          deleted: deletedJob,
        })
      : res.status(404).json({ error: "Job not found" });
  } catch (error) {
    res.status(500).json({ error: "Failed to delete job" });
  }
});

/* ---------------- SERVER ---------------- */

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => console.log(`Server is running on PORT ${PORT}`));
module.exports = app;
