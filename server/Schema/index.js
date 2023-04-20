import mongoose, { Schema } from "mongoose";

const userSchema = new Schema(
  {
    name: { type: String },
    emaill: { type: String },
    password: { type: String },
    created_at: { type: String, default: Date },
  },
  { collection: "users" }
);

export default mongoose.model("users", userSchema);
