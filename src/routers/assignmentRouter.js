import { Router } from "express";
import {
  allAssignmentController,
  createAssignmentController,
  getMenteeTrackAssignmentController,
} from "../controllers/assignmentController.js";

import { verifyAuth } from "../middlewares/authMiddleware.js";
const assignmentRouter = Router();

assignmentRouter.post("/", verifyAuth, createAssignmentController);
assignmentRouter.get(
  "/admin-get-assignment",
  verifyAuth,
  allAssignmentController
);
assignmentRouter.get(
  "/mentee-track-assignment",
  verifyAuth,
  getMenteeTrackAssignmentController
);

export default assignmentRouter;
