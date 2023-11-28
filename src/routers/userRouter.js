/**
 * Router that controls the user module
 */

import { Router } from "express";
import {
  allUsersController,
  createUserController,
  fetchMenteesController,
  myProfileController,
  userLoginController,
} from "../controllers/userController.js";
import { verifyAuth } from "../middlewares/authMiddleware.js";

const userRouter = Router();

userRouter.post("/", createUserController);
userRouter.post("/login", userLoginController);
userRouter.get("/user-profile/:Id", verifyAuth, myProfileController);
userRouter.get("/all-users", verifyAuth, allUsersController);
userRouter.get("/all-mentees", verifyAuth, fetchMenteesController);

export default userRouter;
