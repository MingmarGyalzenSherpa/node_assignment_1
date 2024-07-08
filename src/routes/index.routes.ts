import todoRouter from "./todo.routes";

import express from "express";

const router = express();

router.use("/todos", todoRouter);

export default router;
