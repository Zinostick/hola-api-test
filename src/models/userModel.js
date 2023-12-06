import mongoose, { Schema } from "mongoose";

/**
 * Use mongoose schema to create a structured and organized database model
 */
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: String,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["admin", "mentor", "mentee"],
      required: true,
    },
    track: {
      type: String,
      enum: ["frontend", "backend", "devops", "product-design"],
    },
  },
  {
    timestamps: true,
  }
);

// A model is used to interact with the database
const UserModel = mongoose.model("User", userSchema);

//ASSIGNMENT MODEL TO CREATE ASSIGNMENT

export default UserModel;
