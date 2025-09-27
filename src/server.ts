import express from "express";
import cors from "cors";
import { users } from "./bd";

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

const posts: Post[] = [];
let nextPostId = 1;

const app = express();
app.use(express.json());
app.use(cors());

//ex: 1 ------------ (descomentar para testar!!!!!)

/*app.get("/users/:id", (req: express.Request, res: express.Response) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "usuário não encontrado",
    });
  }

  res.json({
    success: true,
    user,
  });
});
*/

//ex: 2 ---------------(comentar o 1 para testar!!!)

app.get("/users/age-range", (req: express.Request, res: express.Response) => {
  const min = Number(req.query.min);
  const max = Number(req.query.max);

  if (isNaN(min) || isNaN(max)) {
    return res.status(400).json({
      success: false,
      message: "invalido, use min e max como números.",
    });
  }

  const userfiltrado = users.filter(
    (user) => user.age >= min && user.age <= max
  );

  res.json({
    success: true,
    users: userfiltrado,
  });
});

//ex: 3---------------------

app.post("/posts", (req: express.Request, res: express.Response) => {
  const { title, content, authorId } = req.body;

  if (!title || title.length < 3) {
    return res.status(400).json({
      success: false,
      message: "O título deve ter no mínimo 3 letras",
    });
  }

  if (!content || content.length < 10) {
    return res.status(400).json({
      success: false,
      message: "O conteúdo deve ter no mínimo 10 letras",
    });
  }

  const authorExists = users.some((user) => user.id === authorId);
  if (!authorExists) {
    return res.status(400).json({
      success: false,
      message: "authorId inválido. Usuário não encontrado",
    });
  }

  const newPost: Post = {
    id: nextPostId++,
    title,
    content,
    authorId,
    createdAt: new Date(),
    published: false,
  };

  posts.push(newPost);

  res.status(201).json({
    success: true,
    post: newPost,
  });
});

// ex: 4 --------

app.put("/users/:id", (req: express.Request, res: express.Response) => {
  const userId = Number(req.params.id);
  const { name, email, role, age } = req.body;

  if (isNaN(userId)) {
    return res.status(400).json({ success: false, message: "id inválido" });
  }

  const index = users.findIndex((u) => u.id === userId);
  if (index === -1) {
    return res
      .status(404)
      .json({ success: false, message: "usuário não encontrado" });
  }

  if (!name || !email || !role || age === undefined) {
    return res.status(400).json({
      success: false,
      message: "todos os campos devem ser fornecidos",
    });
  }

  const emailConflict = users.some((u) => u.email === email && u.id !== userId);
  if (emailConflict) {
    return res.status(400).json({
      success: false,
      message: "email já está sendo usado por outro usuario",
    });
  }

  if (name.length < 3) {
    return res.status(400).json({
      success: false,
      message: "o nome deve ter no mínimo 3 letras",
    });
  }
  if (age < 0) {
    return res.status(400).json({ success: false, message: "idade inválida" });
  }

  users[index] = {
    id: userId,
    name,
    email,
    age,
    senha: users[index].senha,
    role,
  };

  res.json({ success: true, user: users[index] });
});

// ex 5------------

interface Post {
  id: number;
  title: string;
  content: string;
  authorId: number;
  createdAt: Date;
  published: boolean;
}

app.patch("/posts/:id", (req: express.Request, res: express.Response) => {
  const postId = Number(req.params.id);
  if (isNaN(postId)) {
    return res.status(400).json({ success: false, message: "id inválido" });
  }

  const post = posts.find((p) => p.id === postId);
  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "post não encontrado" });
  }

  const { title, content, published } = req.body;

  // Atualizar apenas campos permitidos
  if (title !== undefined) {
    if (title.length < 3) {
      return res.status(400).json({
        success: false,
        message: "título deve ter no mínimo 3 letras",
      });
    }
    post.title = title;
  }

  if (content !== undefined) {
    if (content.length < 10) {
      return res.status(400).json({
        success: false,
        message: "conteudo deve ter no mínimo 10 letras",
      });
    }
    post.content = content;
  }

  if (published !== undefined) {
    if (typeof published !== "boolean") {
      return res
        .status(400)
        .json({ success: false, message: "published deve ser true ou false" });
    }
    post.published = published;
  }

  res.json({ success: true, post });
});

// ex: 6 -----------------

app.delete("/posts/:id", (req: express.Request, res: express.Response) => {
  const postId = Number(req.params.id);
  if (isNaN(postId)) {
    return res
      .status(400)
      .json({ success: false, message: "id do post inválido" });
  }

  const postIndex = posts.findIndex((p) => p.id === postId);
  if (postIndex === -1) {
    return res
      .status(404)
      .json({ success: false, message: "post não encontrado" });
  }

  const userIdHeader = req.header("user-Id");
  if (!userIdHeader) {
    return res
      .status(400)
      .json({ success: false, message: "user-Id é obrigatório no header" });
  }
  const userId = Number(userIdHeader);
  if (isNaN(userId)) {
    return res
      .status(400)
      .json({ success: false, message: "user-Id inválido" });
  }

  const user = users.find((u) => u.id === userId);
  if (!user) {
    return res
      .status(403)
      .json({ success: false, message: "usuário não autorizado" });
  }

  const post = posts[postIndex];

  if (post.authorId !== userId && user.role !== "admin") {
    return res.status(403).json({
      success: false,
      message: "apenas o autor ou admins podem remover este post",
    });
  }

  posts.splice(postIndex, 1);

  res.json({ success: true, message: "post removido com sucesso" });
});

//ex: 7----------

app.delete(
  "/users/cleanup-inactive",
  (req: express.Request, res: express.Response) => {
    const confirm = req.query.confirm;

    if (confirm !== "true") {
      return res.status(400).json({
        success: false,
        message: "parametro confirm=true é obrigatório pra limpar",
      });
    }

    const usersToRemove = users.filter(
      (user) =>
        user.role !== "admin" &&
        !posts.some((post) => post.authorId === user.id)
    );

    const removedUsers: typeof users = [];
    usersToRemove.forEach((user) => {
      const index = users.findIndex((u) => u.id === user.id);
      if (index !== -1) {
        removedUsers.push(users.splice(index, 1)[0]);
      }
    });

    res.json({
      success: true,
      removedUsers,
    });
  }
);

//fim ---------

app.listen(3003, () => {
  console.log("Servidor rodando na porta 3003");
});
