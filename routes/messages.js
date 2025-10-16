import { Router } from "express";
import { Message } from "../models/Message.js";
import { ensure, has, optionalBoolean } from "../middleware/validate.js";

const router = Router();

router.get("/", async (req, res, next) => {
  try {
    const { userId = "", q = "", before = "", limit = "50" } = req.query;
    const lim = Math.max(1, Math.min(parseInt(limit, 10) || 50, 200));

    const filter = {};
    if (userId) filter.userId = String(userId);
    if (q) filter.$text = { $search: String(q) };
    if (before) {
      const d = new Date(before);
      if (!isNaN(d)) filter.createdAt = { $lt: d };
    }

    const items = await Message.find(filter)
      .sort({ createdAt: 1 }) // ascending for chat
      .limit(lim)
      .lean();

    res.json(items);
  } catch (e) {
    next(e);
  }
});

// POST /api/messages { userId, text }
router.post("/", ensure([has("text")]), async (req, res, next) => {
  try {
    const { userId = "me-default", text } = req.body;
    const doc = await Message.create({ userId, text: String(text).trim() });
    res.status(201).json(doc);
  } catch (e) {
    next(e);
  }
});

// PATCH /api/messages/:id { text?, pinned? }
router.patch(
  "/:id",
  ensure([optionalBoolean("pinned")]),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const patch = {};
      if (typeof req.body.text === "string" && req.body.text.trim())
        patch.text = req.body.text.trim();
      if (typeof req.body.pinned === "boolean") patch.pinned = req.body.pinned;

      const updated = await Message.findByIdAndUpdate(id, patch, {
        new: true,
        runValidators: true,
      });
      if (!updated)
        return res.status(404).json({ message: "Message not found" });
      res.json(updated);
    } catch (e) {
      next(e);
    }
  }
);

// DELETE /api/messages/:id
router.delete("/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const ok = await Message.findByIdAndDelete(id);
    if (!ok) return res.status(404).json({ message: "Message not found" });
    res.status(204).end();
  } catch (e) {
    next(e);
  }
});

export default router;
