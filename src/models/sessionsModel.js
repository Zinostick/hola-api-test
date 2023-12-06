import mongoose, { Schema } from "mongoose";

const sessionSchema = new Schema(
  {
    venue: {
      type: String,
      required: true,
    },
    time: {
      type: String,
      required: true,
    },
    date: {
      type: String,
    },
    track: {
      type: String,
      enum: ["frontend", "backend", "devops", "product-design"],
    },
    scheduledBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  {
    timestamps: true,
  }
);
const SessionModel = mongoose.model("Session", sessionSchema);

export default SessionModel;
