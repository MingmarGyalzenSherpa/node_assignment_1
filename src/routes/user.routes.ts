import express from "express";
import { createUser, getAllUsers } from "../controller/userController";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = express();

router.use(authentication);

router.get("/", authorization("user.get"), getAllUsers);

router.post("/create", authorization("user.create"), createUser);
export default router;
