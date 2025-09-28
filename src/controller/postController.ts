import { Request, Response } from "express";
import { createPost, updatePost, deletePost } from "../business/PostBusiness";
import { users } from "../bd";
import { posts } from "../data/postData";

export const createNewPost = (req: Request, res: Response) => {
  const { title, content, authorId } = req.body;

  if (!users.some((u) => u.id === authorId)) {
    return res
      .status(400)
      .json({ success: false, message: "authorId inválido" });
  }

  if (!title || title.length < 3) {
    return res
      .status(400)
      .json({ success: false, message: "Título deve ter no mínimo 3 letras" });
  }

  if (!content || content.length < 10) {
    return res
      .status(400)
      .json({
        success: false,
        message: "Conteúdo deve ter no mínimo 10 letras",
      });
  }

  const newPost = createPost(title, content, authorId);
  res.status(201).json({ success: true, post: newPost });
};

export const patchUpdatePost = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = updatePost(id, req.body);

  if (!updated) {
    return res
      .status(404)
      .json({ success: false, message: "post não encontrado" });
  }

  res.json({ success: true, post: updated });
};

export const deletePostById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const userId = Number(req.header("user-Id"));

  const post = posts.find((p) => p.id === id);
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post não encontrado" });
  }

  const user = users.find((u) => u.id === userId);
  if (!user || (user.role !== "admin" && user.id !== post.authorId)) {
    return res.status(403).json({ success: false, message: "não autorizado" });
  }

  deletePost(id);
  res.json({ success: true, message: "post removido com sucesso" });
};
