import todoRouter from "./todo.routes";
import userRouter from "./user.routes";

import express from "express";

const router = express();

router.use("/todos", todoRouter);
router.use("/user", userRouter);


export default router;
