import { connection } from "../dbConnection";
import { Pet } from "../types/Pet";

export class PetData {
  async getPetById(petId: Number) {
    try {
      const pet = await connection("pets").where({ id: petId }).first();
      return pet;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  async getAllPets() {
    try {
      const pets = await connection("pets").select();
      return pets;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async insertPet(pet: Omit<Pet, "id">): Promise<Pet> {
    try {
      const [newPet] = await connection("pets").insert(pet).returning("*");
      return newPet;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updatePet(id: number, pet: Omit<Pet, "id">): Promise<Pet> {
    try {
      const [updatedPet] = await connection("pets")
        .where({ id })
        .update(pet)
        .returning("*");
      return updatedPet;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deletePet(id: number): Promise<void> {
    try {
      await connection("pets").where({ id }).del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserById(userId: number) {
    try {
      const user = await connection("users").where({ id: userId }).first();
      return user || null;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
