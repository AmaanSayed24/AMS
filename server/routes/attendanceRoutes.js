import express from "express";
import Attendance from "../models/Attendance.js";

const router = express.Router();

router.post("/mark", async (req, res) => {
  const { studentId, subjectId, date, status } = req.body;
  const attendance = new Attendance({ studentId, subjectId, date, status });
  await attendance.save();
  res.json({ message: "Attendance marked" });
});

router.get("/report", async (req, res) => {
  const { studentId, subjectId, date } = req.query;
  const filter = {};
  if (studentId) filter.studentId = studentId;
  if (subjectId) filter.subjectId = subjectId;
  if (date) filter.date = new Date(date);

  const report = await Attendance.find(filter).populate("studentId").populate("subjectId");
  res.json(report);
});

export default router;