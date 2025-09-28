import { User } from "../bd";

let nextPostId = 1;

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

// Lista de posts
export const posts: Post[] = [];

// Função para gerar o próximo id
export const getNextPostId = (): number => {
  return nextPostId++;
};
