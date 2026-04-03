import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

// CREATE job
router.post("/", async (req, res) => {
  try {
    const { title, company, location, link } = req.body;

    if (!title || !company) {
      return res.status(400).json({ error: "Title and company required" });
    }

    const job = await prisma.job.create({
      data: { title, company, location, link },
    });

    res.status(201).json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET all jobs
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" },
    });

    res.json(jobs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET single job
router.get("/:id", async (req, res) => {
  try {
    const job = await prisma.job.findUnique({
      where: { id: Number(req.params.id) },
      include: { notes: true, interviews: true },
    });

    if (!job) return res.status(404).json({ error: "Job not found" });

    res.json(job);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE job
router.put("/:id", async (req, res) => {

    const validTransitions = {
  APPLIED: ["SCREENING"],
  SCREENING: ["INTERVIEW", "REJECTED"],
  INTERVIEW: ["OFFER", "REJECTED"],
  OFFER: [],
  REJECTED: []
};

router.put("/:id", async (req, res) => {
  try {
    const { status } = req.body;

    const job = await prisma.job.findUnique({
      where: { id: Number(req.params.id) }
    });

    if (!job) {
      return res.status(404).json({ error: "Job not found" });
    }

    const allowed = validTransitions[job.status];

    if (!allowed.includes(status)) {
      return res.status(400).json({
        error: `Invalid transition from ${job.status} → ${status}`
      });
    }

    const updated = await prisma.job.update({
      where: { id: job.id },
      data: { status }
    });

    res.json(updated);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



});

// DELETE job
router.delete("/:id", async (req, res) => {
  try {
    await prisma.job.delete({
      where: { id: Number(req.params.id) },
    });

    res.json({ message: "Deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;