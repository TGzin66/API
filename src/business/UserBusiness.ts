import { users } from "../bd";

export const findUserById = (id: number) => {
  return users.find((u) => u.id === id);
};

export const filterUsersByAge = (min: number, max: number) => {
  return users.filter((user) => user.age >= min && user.age <= max);
};

export const updateUser = (id: number, data: Partial<(typeof users)[0]>) => {
  const index = users.findIndex((u) => u.id === id);
  if (index === -1) return null;

  users[index] = { ...users[index], ...data };
  return users[index];
};

export const cleanupInactiveUsers = (posts: { authorId: number }[]) => {
  const usersToRemove = users.filter(
    (user) =>
      user.role !== "admin" && !posts.some((post) => post.authorId === user.id)
  );

  const removedUsers: typeof users = [];
  usersToRemove.forEach((user) => {
    const index = users.findIndex((u) => u.id === user.id);
    if (index !== -1) {
      removedUsers.push(users.splice(index, 1)[0]);
    }
  });

  return removedUsers;
};
