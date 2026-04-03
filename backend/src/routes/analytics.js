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

    const responseRate = total === 0 ? 0 : (interviews / total) * 100;

    res.json({
      totalApplications: total,
      interviews,
      offers,
      responseRate: responseRate.toFixed(2) + "%"
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;