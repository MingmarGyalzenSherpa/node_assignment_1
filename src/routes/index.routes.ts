import todoRouter from "./todo.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

import express from "express";

const router = express();

//todo routes
router.use("/todos", todoRouter);

//users routes
router.use("/users", userRouter);

//auth routes
router.use("/auth", authRouter);

export default router;
