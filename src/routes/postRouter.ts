import express from "express";
import {
  createNewPost,
  patchUpdatePost,
  deletePostById,
} from "../controller/postController";

export const postRouter = express.Router();

postRouter.post("/", createNewPost);
postRouter.patch("/:id", patchUpdatePost);
postRouter.delete("/:id", deletePostById);
