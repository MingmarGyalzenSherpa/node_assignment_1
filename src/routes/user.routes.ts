import express from "express";
import {
  createUser,
  deleteUserById,
  getAllUsers,
  getUserById,
  updateUser,
} from "../controller/userController";
import { authentication, authorization } from "../middlewares/auth.middleware";
import { validateReqBody, validateReqQuery } from "../middlewares/validator";
import {
  createUserBodySchema,
  getUserQuerySchema,
} from "../schema/user.schema";

const router = express();

router.use(authentication);

//get all user
router.get(
  "/",
  authorization("user.get"),
  validateReqQuery(getUserQuerySchema),
  getAllUsers
);

//get user by id
router.get("/:id", authorization("user.get"), getUserById);

//update user
router.put("/:id", authorization("user.update"), updateUser);

//create a user
router.post(
  "/create",
  authorization("user.create"),
  validateReqBody(createUserBodySchema),
  createUser
);

//delete a user
router.delete("/:id", authorization("user.delete"), deleteUserById);

export default router;
