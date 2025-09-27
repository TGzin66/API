export interface User {
  id: number;
  name: string;
  age: number;
  email: string;
  senha: string;
  role: string; // "admin" | "user"
}

export const users: User[] = [
  {
    id: 1,
    name: "Flávio",
    age: 27,
    email: "flavio@flavio.com",
    senha: "flavio",
    role: "admin",
  },
];
