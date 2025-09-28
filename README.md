Criado por Heron

API
Este projeto é uma API construída com Node.js e TypeScript
Ele foi estruturado em camadas (Data, Business, Controller, Routes) 

Estrutura de Pastas

business/ → Regras de negócio (UserBusiness, PostBusiness)

controller/ → Controladores (recebem requisições e chamam o business)

data/ → "Banco de dados" mockado e funções de acesso a dados

routes/ → Rotas Express

app.ts → Configuração do express e middlewares

server.ts → Inicialização do servidor

Como Rodar o Projeto

Clonar o repositório
git clone <url-do-repo>
cd <nome-da-pasta>

Instalar dependências

Rodar o servidor
npm run dev

O servidor rodará por padrão em http://localhost:3003

Endpoints

Usuários:

GET /users/:id → Busca um usuário pelo ID

GET /users/age-range?min=20&max=30 → Filtra usuários por faixa etária

PUT /users/:id → Atualiza dados de um usuário

DELETE /users/cleanup-inactive?confirm=true → Remove usuários sem posts (exceto admin)

Posts:

POST /posts → Cria um novo post

PATCH /posts/:id → Atualiza campos de um post

DELETE /posts/:id → Remove um post (somente autor ou admin)

Tecnologias Utilizadas

Node.js
Express
TypeScript
Cors
Nodemon (para ambiente de desenvolvimento)

Regras de Negócio

Usuário:

Nome deve ter no mínimo 3 letras.

Email não pode se repetir.

Apenas administradores podem excluir outros usuários ou limpar usuários inativos.

Autor: Heron
