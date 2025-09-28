import { User } from "../bd";

export const postState = {
  nextPostId: 1,
};

export interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

export const posts: Post[] = [];
export let nextPostId = 1;
