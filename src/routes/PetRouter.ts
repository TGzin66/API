import express from "express";
import { PetController } from "../controller/PetController";

export const petRouter = express.Router();

const petController = new PetController();

petRouter.get("/", petController.getAll);
petRouter.get("/:id", petController.getById);
petRouter.post("/", petController.create);
petRouter.put("/:id", petController.update);
petRouter.delete("/:id", petController.delete);
