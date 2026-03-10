# User Portal

A Next.js (App Router) frontend for managing users through a backend user service.

## Tech Stack

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS v4
- Framer Motion

## What This App Does

- View paginated users list
- Search users by ID or email
- Create a user
- Update a selected user
- Delete a selected user (with confirmation)
- Display errors and success messages from backend responses

## Architecture

This project uses a two-layer API flow:

1. Client components call the Next.js API routes under `/api/users`.
2. Route handlers in `app/api/users/**` proxy requests to your backend user service.

This keeps backend endpoints hidden from the browser and centralizes response normalization.

## Project Structure

```text
app/
	page.tsx                 Main dashboard UI (list, search, add/update/delete modal)
	layout.tsx               Root layout
	globals.css              Global styles (glass UI + form styles)
	api/
		users/route.ts         GET list/search, POST create (proxy to backend)
		users/[id]/route.ts    PUT update, DELETE remove (proxy to backend)
components/
	UsersList.tsx            Paginated users table + load button
	UserSearch.tsx           Search form + result card
services/
	userService.ts           Client-side API calls to Next.js routes
types/
	user.ts                  Shared interfaces for user and API responses
```

## Environment Variables

Create `.env.local` in the project root:

```env
# Public base URL used by client-side fetch calls in services/userService.ts
# Local dev value should point to this Next.js app.
NEXT_PUBLIC_API_BASE_URL=http://localhost:3000

# Backend user-service base URL used by route handlers in app/api/users/**
USER_SERVICE_URL=http://localhost:8080
```

Notes:

- `NEXT_PUBLIC_API_BASE_URL` is required by `services/userService.ts`.
- `USER_SERVICE_URL` defaults to `http://localhost:8080` if omitted.

## Backend Endpoints Expected

The Next.js route handlers currently proxy to these backend routes:

- `GET {USER_SERVICE_URL}/getusers?page={page}&pageSize={pageSize}`
- `GET {USER_SERVICE_URL}/getuserbyid/{userId}`
- `GET {USER_SERVICE_URL}/getuserbyemail/{email}`
- `POST {USER_SERVICE_URL}/add-user`
- `PUT {USER_SERVICE_URL}/update-user/{id}`
- `DELETE {USER_SERVICE_URL}/delete-user/{id}`

If your backend uses different endpoint names, update:

- `app/api/users/route.ts`
- `app/api/users/[id]/route.ts`

## Getting Started

```bash
npm install
npm run dev
```

Open `http://localhost:3000`.

## Available Scripts

- `npm run dev` - Start dev server
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Contracts in Frontend

- `getAllUsers(page, pageSize)` returns `PaginatedResponse<User>`.
- Search/create/update/delete calls use `ApiResponse<T>`.
- Route handlers normalize some backend payloads:
	- Wrap single-user search result as `{ data: user }` when needed.
	- Wrap array list result into paginated shape when backend returns plain array.

## UI Behavior Notes

- Search card shows user email in the found result panel.
- Update/Delete actions require selecting a user from search first.
- Delete action requires typing `CONFIRM` before submit.
- Form validation includes:
	- required fields
	- age > 0
	- email format
	- phone number format (6 to 15 digits)

## Troubleshooting

- `NEXT_PUBLIC_API_BASE_URL is not defined`:
	- Ensure `.env.local` exists and contains `NEXT_PUBLIC_API_BASE_URL`.

- Requests fail with backend connection errors:
	- Ensure backend is running at `USER_SERVICE_URL`.
	- Confirm backend routes match those listed above.

- Changes to `.env.local` not reflected:
	- Restart the Next.js dev server.

## License

Private internal project.
