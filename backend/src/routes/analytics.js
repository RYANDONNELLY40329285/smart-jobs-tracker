import express from "express";
import prisma from "../db/prisma.js";

const router = express.Router();

// Summary stats
router.get("/summary", async (req, res) => {
  try {
    const total = await prisma.job.count();

    const interviews = await prisma.job.count({
      where: { status: "INTERVIEW" }
    });

    const offers = await prisma.job.count({
      where: { status: "OFFER" }
    });



    const responses = await prisma.job.count({
      where: {
        status: {
          in: ["SCREENING", "INTERVIEW", "OFFER"]
        }
      }
    });

    const responseRate =
      total === 0 ? "0%" : ((responses / total) * 100).toFixed(2) + "%";

    res.json({
      totalApplications: total,
      interviews,
      offers,
      responseRate
    });

  } catch (err) {
    console.error(err);

    res.json({
      totalApplications: 0,
      interviews: 0,
      offers: 0,
      responseRate: "0%"
    });
  }
});

// Weekly applications
router.get("/weekly", async (req, res) => {
  try {
    const jobs = await prisma.job.findMany({
      select: { dateApplied: true }
    });

    const weekly = {};

    jobs.forEach(job => {
      const date = new Date(job.dateApplied);

      // Get year + week number
      const start = new Date(date.getFullYear(), 0, 1);
      const diff = (date - start + (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60000);
      const week = Math.floor(diff / (7 * 24 * 60 * 60 * 1000));

      const key = `${date.getFullYear()}-W${week}`;

      weekly[key] = (weekly[key] || 0) + 1;
    });

    res.json(weekly);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


export default router;