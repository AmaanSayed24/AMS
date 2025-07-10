import express from "express";
import Student from "../models/Student.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await Student.find()));
router.post("/", async (req, res) => res.json(await Student.create(req.body)));
router.put("/:id", async (req, res) => res.json(await Student.findByIdAndUpdate(req.params.id, req.body)));
router.delete("/:id", async (req, res) => res.json(await Student.findByIdAndDelete(req.params.id)));

export default router;