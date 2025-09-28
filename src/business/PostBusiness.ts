import { posts, nextPostId, Post } from "../data/postData";

export const createPost = (
  title: string,
  content: string,
  authorId: number
): Post => {
  const newPost: Post = {
    id,
    title,
    content,
    authorId,
    createdAt: new Date(),
    published: false,
  };

  posts.push(newPost);
  return newPost;
};

export const updatePost = (id: number, data: Partial<Post>) => {
  const post = posts.find((p) => p.id === id);
  if (!post) return null;

  Object.assign(post, data);
  return post;
};

export const deletePost = (id: number) => {
  const index = posts.findIndex((p) => p.id === id);
  if (index === -1) return null;

  return posts.splice(index, 1)[0];
};
