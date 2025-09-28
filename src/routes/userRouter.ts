import express from "express";
import {
  getUserById,
  getUsersByAgeRange,
  putUpdateUser,
  deleteInactiveUsers,
} from "../controller/userController";

export const userRouter = express.Router();

userRouter.get("/:id", getUserById);
userRouter.get("/age-range", getUsersByAgeRange);
userRouter.put("/:id", putUpdateUser);
userRouter.delete("/cleanup-inactive", deleteInactiveUsers);
