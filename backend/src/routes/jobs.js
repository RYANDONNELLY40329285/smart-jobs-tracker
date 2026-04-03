import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();



function detectRoleType(title) {
  const t = title.toLowerCase();

  if (t.includes("engineer") || t.includes("developer")) return "Engineering";
  if (t.includes("data")) return "Data";
  if (t.includes("support")) return "Support";

  return "Other";
}




// CREATE job
router.post("/", async (req, res) => {
  try {
    const { title, company, location, link } = req.body;

    // Validation
    if (!title || !company) {
      return res.status(400).json({
        error: "Title and company are required"
      });
    }

    // Auto classification
    const roleType = detectRoleType(title);

    const job = await prisma.job.create({
      data: {
        title,
        company,
        location,
        link,
        roleType
      }
    });

    res.status(201).json(job);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to create job"
    });
  }
});

// ==========================
// GET all jobs
// ==========================
router.get("/", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      orderBy: { createdAt: "desc" }
    });

    res.json(jobs);
  } catch (err) {
    console.error(err);
    res.status(500).json({
      error: "Failed to fetch jobs"
    });
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

// ==========================
// ADD NOTE to a job
// ==========================
router.post("/:id/notes", async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const { content } = req.body;

    if (!content) {
      return res.status(400).json({ error: "Note content required" });
    }

    const note = await prisma.note.create({
      data: {
        content,
        jobId
      }
    });

    res.status(201).json(note);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add note" });
  }
});

// ==========================
// GET notes for a job
// ==========================
router.get("/:id/notes", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const notes = await prisma.note.findMany({
      where: { jobId },
      orderBy: { createdAt: "desc" }
    });

    res.json(notes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch notes" });
  }
});



// ==========================
// ADD interview
// ==========================
router.post("/:id/interviews", async (req, res) => {
  try {
    const jobId = Number(req.params.id);
    const { stage, date, outcome } = req.body;

    if (!stage || !date) {
      return res.status(400).json({
        error: "Stage and date are required"
      });
    }

    const interview = await prisma.interview.create({
      data: {
        stage,
        date: new Date(date),
        outcome,
        jobId
      }
    });

    res.status(201).json(interview);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to add interview" });
  }
});

// ==========================
// GET interviews
// ==========================
router.get("/:id/interviews", async (req, res) => {
  try {
    const jobId = Number(req.params.id);

    const interviews = await prisma.interview.findMany({
      where: { jobId },
      orderBy: { date: "desc" }
    });

    res.json(interviews);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch interviews" });
  }
});



export default router;