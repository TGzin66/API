import { findUserById } from "../data/UserData";
import { User } from "../bd";

export const getUserById = (id: number): User | undefined => {
  return findUserById(id);
};
