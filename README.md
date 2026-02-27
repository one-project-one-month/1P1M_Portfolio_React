# OPOM Portfolio Frontend

Frontend repository for **One Project One Month (OPOM)**.  
Built with React + TypeScript + Vite for public users and admin workflows (portfolio, ideas, user management, timeline, dashboard, and configuration).

## Core Features

- Public pages: home, portfolios, developers, ideas, about us, user profile.
- Auth flows: login, register, profile setup, forgot/reset password, OTP.
- OAuth integration: GitHub and Google.
- User workflows: create/edit portfolio, OPOM registration, personal profile management.
- Admin panel: dashboard, portfolio management, idea management, user management, timeline management, admin profile, configuration.
- Role-based route guard (`USER` / `ADMIN`) with protected routing.
- API integration with refresh-token retry handling via Axios interceptor.
- Zustand persisted auth/user store with encrypted local storage.

## Tech Stack

- React 19 + TypeScript
- Vite 7
- React Router 6
- TanStack Query
- Zustand
- Tailwind CSS v4 + Radix UI
- React Hook Form + Zod
- Axios
- Chart.js

## Project Structure

```txt
src/
  app/
    features/                 # Feature modules (auth, portfolio, admin, etc.)
    routes/                   # Route definitions and guards
  api/                        # Axios client
  assets/                     # Images, svg, icons
  components/                 # Shared UI/layout components
  config/                     # App/API config (env-driven)
  constants/                  # Shared constants and lazy-load exports
  hooks/                      # Shared hooks
  lib/                        # Utilities, secure storage helpers
  store/                      # Zustand stores
  styles/                     # Global and feature styles
  types/                      # Shared type definitions
```

## Environment Variables

Create `.env.local` in project root:

```bash
VITE_APP_NAME=OPOM Portfolio
VITE_BASE_URL=http://localhost:5173
VITE_API_URL=https://api.one-project-one-month.com/swagger-ui/index.html

VITE_GITHUB_CLIENT_ID=your_github_client_id
VITE_GITHUB_REDIRECT_URI=your_github_redirect_uri

VITE_GOOGLE_CLIENT_ID=your_google_client_id
VITE_GOOGLE_REDIRECT_URI=your_google_redirect_uri

VITE_STORAGE_SECRET=your_storage_secret
```

## Local Development

```bash
pnpm install
npm run dev
```

App runs at `http://localhost:5173`.

## Available Scripts

- `npm run dev` - start Vite dev server
- `npm run build` - type-check and build for production

## API and Proxy Notes

- API base URL is controlled by `VITE_API_URL`.

## Deployment

- `vercel.json` is configured for SPA rewrites to `index.html`.
- `Dockerfile` includes a basic Node setup with dependency install and source copy.

## License

This project is licensed under **GNU GPL v3**. See `LICENSE`.
