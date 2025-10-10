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
}
