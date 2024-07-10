import todoRouter from "./todo.routes";
import userRouter from "./user.routes";
import authRouter from "./auth.routes";

import express from "express";

const router = express();

router.use("/todos", todoRouter);
router.use("/users", userRouter);
router.use("/auth", authRouter);

export default router;
