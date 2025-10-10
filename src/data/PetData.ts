import { connection } from "../dbConnection";
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
}
