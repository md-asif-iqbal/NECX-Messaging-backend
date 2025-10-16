import { Router } from "express";
import { User } from "../models/User.js";
import { ensure, has } from "../middleware/validate.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    res.json(await User.find().sort({ createdAt: -1 }).lean());
  } catch (e) {
    next(e);
  }
});

router.post("/", ensure([has("name")]), async (req, res, next) => {
  try {
    const u = await User.create({ name: String(req.body.name).trim() });
    res.status(201).json(u);
  } catch (e) {
    next(e);
  }
});

router.patch("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const patch = {};
    if (typeof req.body.name === "string" && req.body.name.trim())
      patch.name = req.body.name.trim();
    if (typeof req.body.avatar === "string") patch.avatar = req.body.avatar;
    const updated = await User.findByIdAndUpdate(id, patch, {
      new: true,
      runValidators: true,
    });
    if (!updated) return res.status(404).json({ message: "User not found" });
    res.json(updated);
  } catch (e) {
    next(e);
  }
});

router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ok = await User.findByIdAndDelete(id);
    if (!ok) return res.status(404).json({ message: "User not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
