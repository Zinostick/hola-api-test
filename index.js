import dotenv from "dotenv";
dotenv.config();
import express from "express";
import userRouter from "./src/routers/userRouter.js";
import assignmentRouter from "./src/routers/assignmentRouter.js";
import sessionRouter from "./src/routers/sessionRouter.js";
import handleRBAC from "./utils/handleRBAC.js";
import startDB from "./config/db.js";
import cors from "cors";

const app = express();
await startDB().then();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routers
app.use("/users", userRouter);
app.use("/assignment", assignmentRouter);
app.use("/session", sessionRouter);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log("API server running is up on port", PORT);
});

export default app;
