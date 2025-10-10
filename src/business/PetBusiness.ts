import { PetData } from "../data/PetData";
import { Pet } from "../types/Pet";

export class PetBusiness {
  petData = new PetData();

  public async getPetById(petId: Number): Promise<Pet | null> {
    try {
      const pet = await this.petData.getPetById(petId);
      return pet;
    } catch (error: any) {
      throw error;
    }
  }

  public async getAllPets(): Promise<Pet[]> {
    try {
      const pets = await this.petData.getAllPets();
      return pets;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createPet(pet: Omit<Pet, "id">): Promise<Pet> {
    const { name, user_id } = pet;

    if (!name || name.trim() === "")
      throw { status: 400, message: "Name obrigatório" };

    if (!user_id || isNaN(Number(user_id)))
      throw { status: 400, message: "user_id inválido" };

    const userExists = await this.petData.getUserById(user_id);
    if (!userExists) throw { status: 400, message: "user_id inválido" };

    return await this.petData.insertPet(pet);
  }

  public async updatePet(id: number, pet: Omit<Pet, "id">): Promise<Pet> {
    if (!id || isNaN(id)) throw { status: 400, message: "ID inválido" };

    const existingPet = await this.petData.getPetById(id);
    if (!existingPet) throw { status: 404, message: "Pet não encontrado" };

    const { name, user_id } = pet;

    if (!name || name.trim() === "")
      throw { status: 400, message: "Name obrigatório" };

    if (!user_id || isNaN(Number(user_id)))
      throw { status: 400, message: "user_id inválido" };

    const userExists = await this.petData.getUserById(user_id);
    if (!userExists) throw { status: 400, message: "user_id inválido" };

    return await this.petData.updatePet(id, pet);
  }

  public async deletePet(id: number): Promise<void> {
    if (!id || isNaN(id)) throw { status: 400, message: "ID inválido" };

    const existingPet = await this.petData.getPetById(id);
    if (!existingPet) throw { status: 404, message: "Pet não encontrado" };

    await this.petData.deletePet(id);
  }
}
