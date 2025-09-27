import { Router } from "express";
import {
  getUserByIdController,
  getUsersByAgeRangeController,
  updateUserController,
  cleanupInactiveUsersController,
} from "../controller/userController";

export const usersRouter = Router();

usersRouter.get("/:id", getUserByIdController);
usersRouter.get("/age-range", getUsersByAgeRangeController);
usersRouter.put("/:id", updateUserController);
usersRouter.delete("/cleanup-inactive", cleanupInactiveUsersController);
