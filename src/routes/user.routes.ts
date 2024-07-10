import express from "express";
import {
  createUser,
  deleteUser,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController";
import { authentication, authorization } from "../middlewares/auth.middleware";

const router = express();

router.use(authentication);

//get all user
router.get("/", authorization("user.get"), getAllUsers);

//get user by id
router.get("/:id", authorization("user.get"), getUserById);

//update user
router.put("/:id", authorization("user.update"), updateUser);

//create a user
router.post("/create", authorization("user.create"), createUser);

//delete a user
router.delete("/:id", authorization("user.delete"), deleteUser);
export default router;
