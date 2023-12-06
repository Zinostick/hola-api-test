import mongoose, { Schema } from "mongoose";

const assignmentSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  link: {
    type: String,
  },
  track: {
    type: String,
    enum: ["frontend", "backend", "devops", "product-design"],
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});

const AssignmentModel = mongoose.model("Assignment", assignmentSchema);

const submissionSchema = new Schema({
  title: {
    type: String,
  },
  description: {
    type: String,
  },
  review: {
    type: String,
  },
  submitedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
});
export default AssignmentModel;
