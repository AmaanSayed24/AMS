import express from "express";
import Subject from "../models/Subject.js";

const router = express.Router();

router.get("/", async (req, res) => res.json(await Subject.find()));
router.post("/", async (req, res) => res.json(await Subject.create(req.body)));
router.put("/:id", async (req, res) => res.json(await Subject.findByIdAndUpdate(req.params.id, req.body)));
router.delete("/:id", async (req, res) => res.json(await Subject.findByIdAndDelete(req.params.id)));

export default router;