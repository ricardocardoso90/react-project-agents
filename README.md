## NLW Agents

Projeto fullstack desenvolvido durante o evento da Rocketseat. Monorepo com `backend` (API Fastify + PostgreSQL/Drizzle) e `frontend` (React + Vite + Tailwind).

### Tecnologias
- **Backend**: Fastify, @fastify/cors, Zod (+ fastify-type-provider-zod), Drizzle ORM (postgres-js), Drizzle Kit, dotenv
- **Frontend**: React 19, Vite, React Router, TanStack Query, Tailwind CSS, class-variance-authority, clsx, tailwind-merge, Radix UI Slot, lucide-react
- **Infra/Dev**: Docker Compose (PostgreSQL com pgvector), Biome, TypeScript

### Padrões e organização
- **API tipada**: validação de entrada/saída com Zod e Fastify Type Provider
- **ORM schema-first**: `drizzle-orm` com schemas em `backend/src/db/schema` e migrações em `backend/src/db/migrations`
- **Camadas simples**: `http/routes` para rotas; `db` para conexão/schema/seed; `env` com validação de variáveis
- **UI com utilitários**: Tailwind e variantes com `class-variance-authority`

### Pré-requisitos
- Node.js LTS (>= 18)
- Docker e Docker Compose

### Setup do banco de dados
1. No diretório `backend/`, suba o Postgres:
   ```bash
   docker compose up -d
   ```
2. Crie o arquivo `backend/.env`:
   ```bash
   PORT=3333
   DATABASE_URL=postgresql://docker:docker@localhost:5432/agents
   ```
   Observação: a imagem utiliza `pgvector` e habilita a extensão `vector` automaticamente (`backend/docker/setup.sql`).

### Rodando o backend
```bash
cd backend
npm install
npm run db:seed   # popula dados de exemplo (usa o schema do Drizzle)
npm run dev       # inicia a API em http://localhost:3333
```

### Rodando o frontend
```bash
cd frontend
npm install
npm run dev       # http://localhost:5173
```

### Endpoints principais
- `GET /health` — verificação simples da API
- `GET /rooms` — lista de salas (id, name)

### Scripts úteis
- **backend**: `dev`, `start`, `db:seed`
- **frontend**: `dev`, `build`, `preview`

### Observações de configuração
- **CORS**: API permite origem `http://localhost:5173`
- **Drizzle Kit**: configurações em `backend/drizzle.config.ts`


