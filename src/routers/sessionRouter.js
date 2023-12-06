import { Router } from "express";

import {
  createSessionController,
  trackSessionController,
} from "../controllers/sessionController.js";

import { verifyAuth } from "../middlewares/authMiddleware.js";

const sessionRouter = Router();

sessionRouter.post("/", verifyAuth, createSessionController);
sessionRouter.get("/get-sessions", verifyAuth, trackSessionController);

export default sessionRouter;
