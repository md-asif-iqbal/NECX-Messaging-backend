import mongoose from "mongoose";

const MessageSchema = new mongoose.Schema(
  {
    userId: { type: String, index: true },
    text: { type: String, required: true, trim: true },
    pinned: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: "createdAt", updatedAt: "editedAt" } }
);

MessageSchema.index({ text: "text" }); // basic text index for q search
MessageSchema.index({ userId: 1, createdAt: 1 });

export const Message = mongoose.model("Message", MessageSchema);
