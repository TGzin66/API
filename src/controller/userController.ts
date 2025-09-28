import { Request, Response } from "express";
import {
  findUserById,
  filterUsersByAge,
  updateUser,
  cleanupInactiveUsers,
} from "../business/UserBusiness";
import { posts } from "../data/postData";

export const getUserById = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const user = findUserById(id);

  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "usuário não encontrado" });
  }

  res.json({ success: true, user });
};

export const getUsersByAgeRange = (req: Request, res: Response) => {
  const min = Number(req.query.min);
  const max = Number(req.query.max);

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({
      success: false,
      message: "invalido, use min e max como números.",
    });
  }

  const filtered = filterUsersByAge(min, max);
  res.json({ success: true, users: filtered });
};

export const putUpdateUser = (req: Request, res: Response) => {
  const id = Number(req.params.id);
  const updated = updateUser(id, req.body);

  if (!updated) {
    return res
      .status(404)
      .json({ success: false, message: "usuário não encontrado" });
  }

  res.json({ success: true, user: updated });
};

export const deleteInactiveUsers = (req: Request, res: Response) => {
  if (req.query.confirm !== "true") {
    return res
      .status(400)
      .json({
        success: false,
        message: "parametro confirm=true é obrigatório pra limpar",
      });
  }

  const removedUsers = cleanupInactiveUsers(posts);
  res.json({ success: true, removedUsers });
};
