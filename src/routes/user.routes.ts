import express from "express";
import {
  createUser,
  getAllUsers,
  updateUser,
} from "../controller/userController";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = express();

router.use(authentication);

//get all user
router.get("/", authorization("user.get"), getAllUsers);

//update user
router.put("/:id", authorization("user.update"), updateUser);

//create a user
router.post("/create", authorization("user.create"), createUser);
export default router;
