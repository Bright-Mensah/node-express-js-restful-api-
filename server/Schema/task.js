import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema(
  {
    title: { type: String },
    description: { type: String },
    created_at: { type: String, default: Date },
    updated_at: { type: String },
  },
  { collection: "tasks" }
);

export default mongoose.model("tasks", taskSchema);
