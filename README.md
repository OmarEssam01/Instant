# Instant

Instant is a real-time chat and video-call application with an Express backend and a React + Vite frontend. It uses Stream for chat and video features and MongoDB for persistence. The repo is structured for local development and Vercel deployments.

---

## Key Features

- Email/password authentication (signup, login, logout, onboarding)
- Real-time chat using Stream Chat
- Video/call features using Stream Video SDK
- Friend requests and basic user profiles
- Cookie-based JWT authentication for protected routes

---

## Tech Stack

- Backend: Node.js, Express, Mongoose, JWT
- Real-time services: Stream (Chat + Video)
- Frontend: React, Vite, TailwindCSS
- Deployment: Vercel (serverless functions present in `api/`)

---

## Repo Structure

- `backend/` — Express app, controllers, models, lib utilities, API routes
  - `backend/src/server.js` — Express app exported for Vercel serverless usage
  - `backend/src/controllers/` — request handlers (auth, user, chat)
  - `backend/src/lib/` — DB and Stream helper modules
  - `backend/api/index.js` — Vercel function wrapper to forward requests to Express
- `frontend/instant/` — React app (Vite)
  - `frontend/instant/src/Pages/` — main pages (Chat, Call, Home, etc.)
  - `frontend/instant/src/lib/axios.js` — frontend API base URL (uses `VITE_API_URL`)
- `api/index.js` — root Vercel handler that forwards to backend Express app

---

## Prerequisites

- Node.js (v16+ recommended)
- npm or yarn
- MongoDB instance (Atlas or local)
- Stream account (API key & secret)

---

## Environment Variables

Create a `.env` file in `backend/` with at least the following variables:

```
PORT=5001
MONGO_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_jwt_secret
STREAM_API_KEY=your_stream_api_key
STREAM_SECRET=your_stream_secret
NODE_ENV=development
```

Frontend environment (create `.env` in `frontend/instant/`):

```
VITE_API_URL=http://localhost:5001/api
VITE_STREAM_API_KEY=your_stream_api_key
```

Note: `frontend/instant/src/lib/axios.js` falls back to `http://localhost:5001/api` when `VITE_API_URL` is not set.

---

## Local Development

1. Install dependencies

```bash
# From repo root (recommended):
npm run build

# or install manually:
cd backend && npm install
cd ../frontend/instant && npm install
```

2. Run backend (development)

```bash
cd backend
npm run dev
```

3. Run frontend (Vite)

```bash
cd frontend/instant
npm run dev
```

Frontend runs (by default) on `http://localhost:5173`. Ensure backend `PORT` matches the frontend `VITE_API_URL` (default backend API base path: `http://localhost:5001/api`).

---

## Production / Deployment

- This repository includes Vercel configuration and server wrappers under `api/` and `backend/api/` to forward requests to the Express app as serverless functions.
- Recommended flow: deploy the project to Vercel (root). Ensure environment variables are set in the Vercel dashboard (same keys as `.env` above). The root-level `api/index.js` forwards to the backend app.

---

## Available Scripts

- Root `package.json`:
  - `npm run build` — installs dependencies for `backend` and `frontend/instant` and builds the frontend
  - `npm start` — runs the backend start script
- `backend`:
  - `npm run dev` — start backend with `nodemon` (dev)
  - `npm start` — run `node src/server.js`
- `frontend/instant`:
  - `npm run dev` — start Vite dev server
  - `npm run build` — build production assets
  - `npm run preview` — preview production build

---

## Contributing

- Open an issue describing the change or improvement.
- Fork the repo and create feature branches for PRs.
- Add tests where applicable and keep changes minimal and focused.

---

## Troubleshooting

- If the frontend can't reach the backend, confirm `VITE_API_URL` and backend `PORT` are correct and that CORS allows the frontend origin (`http://localhost:5173` by default).
- Check the backend logs for MongoDB or Stream credential errors.

---

## License

No license is specified in this repository. To make this project open source, add a `LICENSE` file (for example, MIT).

---

If you'd like, I can:

- add a sample `.env.example` file
- add a `LICENSE` file (MIT) and update the `package.json` entries
- create a short deployment checklist for Vercel
