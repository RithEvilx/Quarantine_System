# Quarantine System

Yarn monorepo containing the customer website, admin dashboard, and Express/MongoDB API.

## Apps

- `frontend`: public Vite React website, local port `5173`
- `admin`: separate Vite React admin dashboard, local port `5174`
- `server`: Express API, local port `168`, Swagger at `/docs`

## Local setup

1. Copy `server/.env.example` to `server/.env` and set `MONGODB_URI`.
2. Run `yarn install` from this directory.
3. Run applications separately:

```powershell
yarn dev:server
yarn dev:frontend
yarn dev:admin
```

The server owns Telegram delivery. Keep `TELEGRAM_BOT_TOKEN` and `TELEGRAM_CHAT_ID` only in `server/.env` or Render environment settings. Admin authentication uses `HttpOnly` cookies; browser code does not read access or refresh tokens.

## API

The product list follows the existing API contract:

```json
{
  "page": 1,
  "rowsPerPage": "15",
  "orderBy": "id DESC",
  "searchText": ""
}
```

Swagger UI: `http://localhost:168/docs`

## Deployment

Deploy `frontend` and `admin` as separate Vercel projects. Set each project's `VITE_APP_API_URL` to the Render API URL ending in `/api/v1`. Deploy `server` using `render.yaml` and set MongoDB Atlas, JWT, Telegram, and allowed-origin environment variables in Render. Never commit real environment files or secrets.