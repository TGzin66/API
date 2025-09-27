import { Request, Response } from "express";
import * as userBusiness from "../business/UserBusiness";

export const getUserByIdController = (req: Request, res: Response) => {
  const userId = parseInt(req.params.id as string);
  if (isNaN(userId)) {
    return res
      .status(400)
      .json({
        success: false,
        message: "ID do usuário inválido. Por favor, forneça um número.",
      });
  }
  const user = userBusiness.getUserById(userId);
  if (!user) {
    return res
      .status(404)
      .json({ success: false, message: "Usuário não encontrado." });
  }
  res.json({ success: true, data: user });
};
