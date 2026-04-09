# Duitflow

Aplicação full stack para gerenciamento de tarefas, desenvolvida como projeto de estudo com foco em evolução prática e portfólio.

> Fluxo contínuo de execução: organize menos, conclua mais.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)
![EJS](https://img.shields.io/badge/EJS-B4CA65?style=for-the-badge&logo=ejs&logoColor=white)

## Resumo

Duitflow é uma aplicação de lista de tarefas com backend em Node.js e frontend renderizado via EJS. O usuário pode criar, editar, concluir e remover tarefas por meio de uma interface simples, enquanto a API REST gerencia a persistência dos dados em um banco SQLite.

## Stack

**Backend**
- Node.js + Express 5
- Sequelize + SQLite3
- AJV + ajv-errors + ajv-formats (validação de schema)
- EJS (template engine)
- dotenv + cors

**Frontend**
- TypeScript (compilado para JS)
- Bootstrap 5
- jQuery

## Estrutura

```text
backend/
  src/
    server.js
    database/
      config/
      migrations/
      models/
    middlewares/
    routes/
      api/
      views/
    schemas/
frontend/
  css/
  src/
    ts/        # fontes TypeScript
    js/        # saída compilada
  views/
    partials/
    index.ejs
    tasks.ejs
```

## Variáveis de ambiente

Crie o arquivo `backend/.env` com base em `backend/.env.example`:

```env
PORT=3000
NODE_ENV=development
```

## Como rodar

**1. Instale as dependências do backend**

```bash
cd backend
npm install
```

**2. Instale as dependências do frontend**

```bash
cd ../frontend
npm install
```

**3. Compile o TypeScript do frontend**

```bash
npm run build
```

**4. Rode as migrações do banco**

```bash
cd ../backend
npx sequelize-cli db:migrate --config src/database/config/config.js --migrations-path src/database/migrations
```

**5. Inicie o servidor**

```bash
npm run dev
```

**6. Acesse no navegador**

```
http://localhost:3000
```

## Scripts

**Backend** (`backend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor com nodemon |

**Frontend** (`frontend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run build` | Compila o TypeScript para JavaScript |
| `npm run watch` | Recompila automaticamente ao salvar |

## Rotas da aplicação

| Rota | Descrição |
|------|-----------|
| `/` | Página inicial |
| `/tasks` | Painel de tarefas |

## API

Base: `/api/tasks`

| Método | Endpoint | Descrição |
|--------|----------|-----------|
| `GET` | `/api/tasks` | Lista todas as tarefas |
| `GET` | `/api/tasks/:id` | Retorna uma tarefa pelo ID |
| `POST` | `/api/tasks` | Cria uma nova tarefa |
| `PUT` | `/api/tasks/:id` | Atualiza uma tarefa existente |
| `DELETE` | `/api/tasks/:id` | Remove uma tarefa |

**Payload aceito (POST e PUT):**

```json
{
  "title": "string (obrigatório)",
  "description": "string (opcional)",
  "status": "pending | in_progress | done"
}
```

## Banco de dados

- **Dialeto:** SQLite
- **Arquivo:** `backend/src/database/database.sqlite`

**Tabela `Tasks`:**

| Campo | Tipo | Observação |
|-------|------|------------|
| `id` | INTEGER | PK, autoincrement |
| `title` | STRING | Obrigatório |
| `description` | TEXT | Opcional |
| `status` | ENUM | `pending`, `in_progress` ou `done` |
| `createdAt` | DATE | Gerado automaticamente |
| `updatedAt` | DATE | Gerado automaticamente |

## Notas

- O frontend usa os arquivos compilados em `frontend/src/js/`. Após alterar TypeScript, rode `npm run build`.
- Bootstrap e jQuery são instalados via npm e servidos como arquivos estáticos pelo Express. Nenhum CDN externo é utilizado.
- O backend valida os dados das tarefas com AJV antes de persistir.

## Troubleshooting

| Problema | Solução |
|----------|---------|
| `npm run dev` falha no frontend | Esperado: o frontend não tem script `dev` |
| Interface não reflete mudanças no TypeScript | Rode `npm run build` no frontend |
| API retorna 400 | Verifique se `title` está presente no payload |
| Migração falha | Rode o comando de dentro da pasta `backend/` |
