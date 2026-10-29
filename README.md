# KDAG Website

Website for Kharagpur Data Analytics Group, IIT Kharagpur.

The frontend is `frontend/` (React + Vite). The Flask API is in `backend/`.

## Local development

Use Node 22.13+ (or Node 24+) and Python 3.11/3.12. Run MongoDB locally, or use a development MongoDB deployment.

```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
cp .env.example .env   # Only for a new setup; preserve an existing .env
python app.py
```

Set `MONGO_URI`, a random `JWT_SECRET_KEY`, and Google OAuth credentials in `backend/.env`. Account, forum and resource data use `KDAG-BACKEND`; the existing hackathon routes use `PATHWAY_2026`. The API listens on port 5001; `GET /health` provides a process health check.

In a second terminal:

```bash
cd frontend
npm ci
cp .env.example .env   # Only for a new setup; preserve an existing .env
npm run dev -- --port 5173 --strictPort
```

Open `http://localhost:5173`. Set `VITE_FETCH_URL=/api` to connect to the local backend through Vite's proxy. All API calls share one configuration in `src/config/api.js`. Existing `REACT_APP_FETCH_URL`, `REACT_APP_GOOGLE_CLIENT_ID` and `REACT_APP_REDIRECT_URI` remain supported; `VITE_*` settings take precedence. Existing environment files pointing at production continue to use production until explicitly changed.

For Google login, set `VITE_GOOGLE_CLIENT_ID` to the backend's `GOOGLE_CLIENT_ID`. Set both frontend `VITE_REDIRECT_URI` and backend `REDIRECT_URI` to `http://localhost:5173/google-auth/callback`, and register that exact redirect URI and frontend origin in the Google OAuth client. Keep the client secret exclusively in the backend. Restart the servers after changing environment settings.

DOCX resource rendering also needs the Pandoc executable installed on the backend host.

## Production

Deploy `backend/` as the Flask API (its existing Vercel configuration is included). Build the active frontend with `cd frontend && npm ci && npm run build`, and serve `frontend/dist`.

For a separate frontend deployment, set `VITE_FETCH_URL` to the backend's HTTPS origin **before building**. `/api` is a development proxy; a production host using that value must provide its own reverse proxy and strip the `/api` prefix. Set the frontend and backend OAuth redirect settings to the same public `/google-auth/callback` URL registered with Google. Google credentials and the MongoDB connection must be configured on the backend host.

For Vercel frontend hosting, select `frontend` as the project root, use the Vite framework preset and `dist` output. The included `frontend/vercel.json` rewrites page routes to `index.html` so profile links, resource pages and OAuth callbacks survive refreshes. Other static hosts need the equivalent SPA fallback. `npm run preview` previews the production build and requires a reachable API origin configured at build time.

## Verification

```bash
cd frontend
npm test
npm run build
```

From the repository root:

```bash
backend/venv/bin/python -m unittest discover -s backend/tests -v
```

Backend tests use mocked collections and local test configuration, without writing to live databases or contacting Google. A full live login and data persistence check requires configured Google OAuth and a development MongoDB deployment.
