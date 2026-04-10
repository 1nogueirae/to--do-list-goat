# Duitflow - CLAUDE.md

## Project Overview

**Duitflow** is a full-stack task management application ("Continuous execution flow: organize less, conclude more"). Study project with a Node.js/Express backend and a React frontend.

## Architecture

```
to-do-list/
├── backend/          # Express server, REST API, SQLite database
│   └── src/
│       ├── server.js
│       ├── database/ # Sequelize ORM (models, migrations, config)
│       ├── middlewares/ # AJV validation
│       ├── routes/
│       │   └── api/  # REST API routes (/api/tasks)
│       └── schemas/  # AJV JSON schemas
└── frontend/         # React 19 + Vite
    ├── src/
    │   ├── components/  # React components
    │   ├── App.jsx      # Root component
    │   ├── App.css
    │   ├── main.jsx     # Entry point
    │   └── index.css
    ├── public/          # Static assets
    └── index.html
```

## Tech Stack

- **Backend**: Node.js, Express 5, Sequelize 6, SQLite3, AJV (validation), CORS
- **Frontend**: React 19, Vite 8
- **Database**: SQLite (file at `backend/src/database/database.sqlite`)

## Development Setup

Two separate `npm install` needed — one in each directory:

```bash
# Backend
cd backend && npm install
npm run dev          # Starts server on port 3000 with nodemon

# Frontend (separate terminal)
cd frontend && npm install
npm run dev          # Starts Vite dev server (default port 5173)
```

**First-time setup** — run migrations before starting:
```bash
cd backend
npx sequelize-cli db:migrate --config src/database/config/config.js --migrations-path src/database/migrations
```

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | List all tasks |
| GET | `/api/tasks/:id` | Get task by ID |
| POST | `/api/tasks` | Create task |
| PUT | `/api/tasks/:id` | Update task |
| DELETE | `/api/tasks/:id` | Delete task |

The backend runs on port 3000 and has CORS enabled. The frontend communicates with the backend via `fetch`.

## Data Model

**Task**:
- `id` — integer, auto-increment
- `title` — string, required
- `description` — text, optional
- `status` — enum: `pending` | `in_progress` | `done` (default: `pending`)

## Environment Variables

```env
PORT=3000
NODE_ENV=development
```

Copy `backend/.env.example` to `backend/.env` to configure.

## Frontend Design Standard

**Style**: Minimalist dark theme.

**Palette**:
- Background: `#0a0a0a` (near-black)
- Surface (cards): `#141414`
- Border: `#2a2a2a`
- Text primary: `#ffffff`
- Text secondary: `#a0a0a0`
- Accent: `#f5c518` (yellow) — used for brand name, left card borders, in-progress badges, CTAs
- CTA button: yellow background `#f5c518` with black text `#0a0a0a`

**Rules**:
- No light mode. Dark background always.
- No box-shadows or heavy decorations — use subtle borders only.
- No `border-inline` on `#root` (this caused the two vertical lines — keep removed).
- Badges are small, uppercase, letter-spaced. Yellow for in-progress, muted white for done, dark gray for pending.
- Logo placeholder: dashed border `#2a2a2a`, 120×120px, centered above the title on the home page. Replace with `<img>` when a real logo is ready.
