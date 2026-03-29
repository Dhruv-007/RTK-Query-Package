# rtk-quickstart

Scaffold a **production-ready** React project with Redux Toolkit + RTK Query — in one command.

```bash
npx rtk-quickstart my-app
```

No more repetitive boilerplate. Get a clean store, base API, typed hooks, and scalable folder structure out of the box.

---

## Quick Start

```bash
# JavaScript (default)
npx rtk-quickstart my-app

# TypeScript
npx rtk-quickstart my-app --typescript

# TypeScript + Auth module
npx rtk-quickstart my-app --typescript --auth
```

Then:

```bash
cd my-app
npm run dev
```

Your app opens at `http://localhost:3000` with a working RTK Query demo fetching users from JSONPlaceholder.

---

## CLI Options

| Flag              | Description                                                        |
| ----------------- | ------------------------------------------------------------------ |
| `--typescript`    | Use TypeScript template (aliased as `--ts`)                        |
| `--auth`          | Include auth module — token storage, auto headers, login/logout    |
| `--skip-install`  | Skip `npm install` (useful in CI or monorepos)                     |

---

## Generated Folder Structure

```
my-app/
├── index.html
├── package.json
├── vite.config.js          # or .ts with --typescript
├── .env.example
├── .gitignore
└── src/
    ├── main.jsx            # App entry with Provider + Store
    ├── App.jsx             # Demo component using RTK Query
    ├── index.css
    ├── app/
    │   └── store.js        # configureStore with middleware
    ├── services/
    │   ├── baseApi.js      # createApi with fetchBaseQuery + auth headers
    │   └── userApi.js      # Example API slice with injectEndpoints
    ├── hooks/
    │   └── reduxHooks.js   # Typed useAppDispatch & useAppSelector
    └── features/           # (with --auth flag)
        └── authSlice.js    # Token persistence, login/logout actions
```

With `--auth`, you also get `services/authApi.js` with login/register mutation endpoints.

---

## What's Included

### Store (`src/app/store.js`)

- `configureStore` with RTK Query middleware
- Redux DevTools enabled in development

### Base API (`src/services/baseApi.js`)

- `createApi` with `fetchBaseQuery`
- Base URL from `VITE_API_BASE_URL` env variable
- Auto-attaches `Authorization: Bearer <token>` from localStorage
- Tag-based cache invalidation ready

### Example API (`src/services/userApi.js`)

- `getUsers` and `getUserById` query endpoints
- Auto-generated hooks: `useGetUsersQuery`, `useGetUserByIdQuery`
- Cache tags configured

### Typed Hooks (`src/hooks/reduxHooks.js`)

- `useAppDispatch` and `useAppSelector` — pre-typed for TypeScript projects

### Auth Module (opt-in with `--auth`)

- **authSlice** — `setCredentials`, `logout` actions, localStorage persistence
- **authApi** — `login` and `register` mutation endpoints
- Selectors: `selectCurrentUser`, `selectIsAuthenticated`

---

## Adding a New API Slice

Create a new file in `src/services/`:

```js
// src/services/postApi.js
import { baseApi } from "./baseApi";

export const postApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getPosts: builder.query({
      query: () => "/posts",
    }),
  }),
});

export const { useGetPostsQuery } = postApi;
```

Use it in any component — no extra store configuration needed.

---

## Environment Variables

Copy `.env.example` to `.env` and set your API base URL:

```
VITE_API_BASE_URL=https://your-api.example.com
```

---

## Tech Stack

- [React 19](https://react.dev) (via Vite)
- [Redux Toolkit 2.x](https://redux-toolkit.js.org)
- [RTK Query](https://redux-toolkit.js.org/rtk-query/overview)
- [Vite 6](https://vite.dev)

---

## Publishing (for maintainers)

```bash
npm login
npm publish
```

---

## Author

**Dhruv Johari** — Frontend Engineer | React | RTK Query | Product Builder

---

## License

MIT
