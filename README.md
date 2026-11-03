# Blog CMS

[![Next.js](https://img.shields.io/badge/Next.js-16-black?logo=next.js)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)](https://react.dev/)
[![Node.js](https://img.shields.io/badge/Node.js-Express-339933?logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb&logoColor=white)](https://www.mongodb.com/)

A full-stack content management system for writing and managing blog posts. The project is organized as a single repository with separate `frontend` and `backend` applications.

## Features

- Create, edit, and delete blog posts from an admin dashboard.
- Write content with a rich text editor that supports formatting, links, highlights, and text colors.
- Generate unique URL-friendly slugs from post titles.
- Save posts as drafts or publish them through the API.
- Browse published posts and open individual posts by slug.
- View post status and creation date in the admin list.

> The admin interface currently has no authentication or authorization. Protect admin routes before using this project for a public production deployment.

## Tech stack

| Area | Technologies |
| --- | --- |
| Frontend | Next.js 16 (App Router), React 19, Tailwind CSS 4, Axios, Tiptap |
| Backend | Node.js, Express 5, Mongoose |
| Database | MongoDB |
| Utilities | `slugify`, `dotenv`, `cors`, `lucide-react` |

## Project structure

```text
Blog CMS/
├── backend/
│   ├── config/       # MongoDB connection
│   ├── controllers/  # Blog request handlers
│   ├── models/       # Mongoose blog model
│   ├── routes/       # Blog API routes
│   ├── utils/        # Slug generation helper
│   ├── server.js
│   └── package.json
└── frontend/
    ├── src/app/          # Public pages and admin routes
    ├── src/components/   # Blog, editor, and admin UI
    ├── src/lib/          # API client
    └── package.json
```

## Installation

You need Node.js and a MongoDB database. Run the backend and frontend in separate terminals.

### 1. Backend

```bash
cd backend
npm install
```

Create `backend/.env` with your MongoDB connection string and the frontend origin:

```env
PORT=4000
MONGO_URI=mongodb://127.0.0.1:27017/blog-cms
FRONTEND_URL=http://localhost:3000
```

Start the API in development mode:

```bash
npm run dev
```

The API will be available at `http://localhost:4000`.

### 2. Frontend

In another terminal, from the repository root:

```bash
cd frontend
npm install
```

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:4000/api
```

Start the web app:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The home page redirects to the admin blog list. The public blog listing is available at `/blogs`.

## Environment variables

| Application | Variable | Required | Description |
| --- | --- | --- | --- |
| Backend | `PORT` | No | API port; defaults to `4000`. |
| Backend | `MONGO_URI` | Yes | MongoDB connection URI. |
| Backend | `FRONTEND_URL` | Yes | Allowed frontend origin for CORS, such as `http://localhost:3000`. |
| Frontend | `NEXT_PUBLIC_API_URL` | Yes | Backend API base URL, including `/api`, such as `http://localhost:4000/api`. |

## API endpoints

All endpoints are prefixed with `/api`. Blog descriptions are stored as Tiptap JSON. The list endpoint exposes published posts; admin endpoints include drafts.

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/blogs` | List published blogs, newest first. |
| `GET` | `/blogs/:slug` | Get a published blog by slug. |
| `POST` | `/blogs/create` | Create a blog. Send `title`, `description`, and optionally `status` (`draft` or `published`). |
| `PUT` | `/blogs/:id` | Update a blog by MongoDB ID. Accepts `title`, `description`, and/or `status`. |
| `DELETE` | `/blogs/:id` | Delete a blog by MongoDB ID. |
| `GET` | `/blogs/admin/all` | List all blogs, including drafts, for the admin dashboard. |
| `GET` | `/blogs/admin/:id` | Get one blog by MongoDB ID for editing. |



## Author

**Akhilesh**

- GitHub: [akhilesh-yadav026](https://github.com/akhilesh-yadav026)
