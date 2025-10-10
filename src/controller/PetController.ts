import { Request, Response } from "express";
import { PetBusiness } from "../business/PetBusiness";

export class PetController {
  petBusiness = new PetBusiness();

  public getById = async (req: Request, res: Response) => {
    try {
      const id = req.params.id;
      if (!id || isNaN(Number(id))) {
        return res
          .status(400)
          .json({ error: "ID do pet é obrigatório e deve ser um número" });
      }
      const idNumber = Number(id);
      const pet = await this.petBusiness.getPetById(idNumber);
      if (!pet) {
        return res.status(404).json({ error: "pet não encontrado" });
      }
      res.status(200).send(pet);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };
  public getAll = async (req: Request, res: Response) => {
    try {
      const pets = await this.petBusiness.getAllPets();
      res.status(200).send(pets);
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  };

  public create = async (req: Request, res: Response) => {
    try {
      const newPet = await this.petBusiness.createPet(req.body);
      res.status(201).json(newPet);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  public update = async (req: Request, res: Response) => {
    try {
      const idNumber = Number(req.params.id);
      const updatedPet = await this.petBusiness.updatePet(idNumber, req.body);
      res.status(200).json(updatedPet);
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };

  public delete = async (req: Request, res: Response) => {
    try {
      const idNumber = Number(req.params.id);
      await this.petBusiness.deletePet(idNumber);
      res.status(204).send();
    } catch (error: any) {
      res.status(error.status || 500).json({ error: error.message });
    }
  };
}
