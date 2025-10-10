import { UserData } from "../data/UserData";
import { User } from "../types/User";

export class UserBusiness {
  userData = new UserData();
  public async getUserById(userId: Number): Promise<User | null> {
    try {
      const user = await this.userData.getUserById(userId);
      return user;
    } catch (error: any) {
      throw error;
    }
  }
  public async getAllUsers(): Promise<User[]> {
    try {
      const users = await this.userData.getAllUsers();
      return users;
    } catch (error: any) {
      throw new Error(error.message);
    }
  }

  public async createUser(user: Omit<User, "id">): Promise<User> {
    const { name, email } = user;
    if (!name || !email)
      throw { status: 400, message: "nome e email obrigatórios" };

    const existingUser = await this.userData.getUserByEmail(email);
    if (existingUser) throw { status: 409, message: "Email já existe" };

    return await this.userData.insertUser(user);
  }

  public async updateUser(id: number, user: Omit<User, "id">): Promise<User> {
    if (!id || isNaN(id)) throw { status: 400, message: "ID inválido" };

    const existingUser = await this.userData.getUserById(id);
    if (!existingUser) throw { status: 404, message: "Usuário não encontrado" };

    const userWithSameEmail = await this.userData.getUserByEmail(user.email);
    if (userWithSameEmail && userWithSameEmail.id !== id)
      throw { status: 409, message: "Email já existe" };

    return await this.userData.updateUser(id, user);
  }

  public async deleteUser(id: number): Promise<void> {
    if (!id || isNaN(id)) throw { status: 400, message: "ID inválido" };

    const existingUser = await this.userData.getUserById(id);
    if (!existingUser) throw { status: 404, message: "Usuário não encontrado" };

    const pets = await this.userData.getPetsByUserId(id);
    if (pets.length > 0)
      throw {
        status: 409,
        message: "Usuário possui pets e não pode ser removido",
      };

    await this.userData.deleteUser(id);
  }
}
