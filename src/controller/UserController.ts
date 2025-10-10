import { Request, Response } from "express";
import { UserBusiness } from "../business/UserBusiness";

export class UserController {
  userBusiness = new UserBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "ID do usuário é obrigatório e deve ser um número" });
      }
      const idNumber = Number(id);
      const user = await this.userBusiness.getUserById(idNumber);
      if (!user) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
      res.status(200).send(user);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };
  public getAll = async (req: Request, res: Response) => {
    try {
      const users = await this.userBusiness.getAllUsers();
      res.status(200).send(users);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const newUser = await this.userBusiness.createUser(req.body);
      res.status(201).json(newUser);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const idNumber = Number(req.params.id);
      const updatedUser = await this.userBusiness.updateUser(
        idNumber,
        req.body
      );
      res.status(200).json(updatedUser);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const idNumber = Number(req.params.id);
      await this.userBusiness.deleteUser(idNumber);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
}
