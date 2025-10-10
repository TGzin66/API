import { connection } from "../dbConnection";
import { User } from "../types/User";

export class UserData {
  async getUserById(userId: Number) {
    try {
      const user = await connection("users").where({ id: userId }).first();
      return user;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
  async getAllUsers() {
    try {
      const users = await connection("users").select();
      return users;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getUserByEmail(email: string): Promise<User | null> {
    try {
      const user = await connection("users").where({ email }).first();
      return user || null;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async insertUser(user: Omit<User, "id">): Promise<User> {
    try {
      const [newUser] = await connection("users").insert(user).returning("*");
      return newUser;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async updateUser(id: number, user: Omit<User, "id">): Promise<User> {
    try {
      const [updatedUser] = await connection("users")
        .where({ id })
        .update(user)
        .returning("*");
      return updatedUser;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async deleteUser(id: number): Promise<void> {
    try {
      await connection("users").where({ id }).del();
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }

  async getPetsByUserId(userId: number): Promise<any[]> {
    try {
      const pets = await connection("pets").where({ user_id: userId }).select();
      return pets;
    } catch (error: any) {
      throw new Error(error.sqlMessage || error.message);
    }
  }
}
