# Duitflow

Aplicação full stack para gerenciamento de tarefas, desenvolvida como projeto de estudo com foco em evolução prática e portfólio.

> Fluxo contínuo de execução: organize menos, conclua mais.

![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?style=for-the-badge&logo=express&logoColor=white)
![Sequelize](https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=sequelize&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-003B57?style=for-the-badge&logo=sqlite&logoColor=white)
![React](https://img.shields.io/badge/React-61DAFB?style=for-the-badge&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Bootstrap](https://img.shields.io/badge/Bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white)

## Resumo

Duitflow é uma aplicação de lista de tarefas com backend em Node.js e frontend em React. O usuário pode criar, editar, concluir e remover tarefas por meio de uma interface minimalista, enquanto a API REST gerencia a persistência dos dados em um banco SQLite.

## Stack

**Backend**
- Node.js + Express 5
- Sequelize + SQLite3
- AJV + ajv-errors + ajv-formats (validação de schema)
- dotenv + cors

**Frontend**
- React 19 + Vite
- React Router DOM
- Bootstrap 5

## Estrutura

```text
to-do-list/
├── backend/
│   └── src/
│       ├── server.js
│       ├── database/
│       │   ├── config/
│       │   ├── migrations/
│       │   └── models/
│       ├── middlewares/
│       ├── routes/
│       │   └── api/
│       └── schemas/
└── frontend/
    ├── index.html
    ├── public/
    └── src/
        ├── main.jsx
        ├── App.jsx
        ├── components/
        └── pages/
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

**2. Rode as migrações do banco**

```bash
npx sequelize-cli db:migrate --config src/database/config/config.js --migrations-path src/database/migrations
```

**3. Inicie o servidor**

```bash
npm run dev
```

**4. Em outro terminal, instale as dependências do frontend**

```bash
cd frontend
npm install
```

**5. Inicie o frontend**

```bash
npm run dev
```

**6. Acesse no navegador**

```
http://localhost:5173
```

## Scripts

**Backend** (`backend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor com nodemon (porta 3000) |

**Frontend** (`frontend/`)
| Comando | Descrição |
|---------|-----------|
| `npm run dev` | Inicia o servidor de desenvolvimento Vite (porta 5173) |
| `npm run build` | Gera build de produção |
| `npm run preview` | Visualiza o build de produção |
| `npm run lint` | Executa o ESLint |

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

- O backend roda na porta 3000 e o frontend na porta 5173 (Vite). CORS está habilitado no backend.
- O backend valida os dados das tarefas com AJV antes de persistir.
- Bootstrap é instalado via npm e importado no projeto React.

## Troubleshooting

| Problema | Solução |
|----------|---------|
| API retorna 400 | Verifique se `title` está presente no payload |
| Migração falha | Rode o comando de dentro da pasta `backend/` |
| Frontend não conecta ao backend | Confirme que o backend está rodando na porta 3000 |
