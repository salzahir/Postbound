# Postbound

A full-stack blog platform built with Next.js, Express, and Prisma.

## Features

- **Authentication:** Secure login, JWT storage, protected routes, and role-based access.
- **Posts:** Full CRUD, publish/unpublish, author-only controls, timestamps, and public/private logic.
- **Comments:** Full CRUD, user association, edit/delete for own comments, and proper linking to posts.
- **UI/UX:** Clean, functional, and responsive with Tailwind CSS. Includes loading states, error handling, and confirmation dialogs (or plans for them).
- **Admin/Author Features:** Ability to manage posts and comments, not just consume content.

## Tech Stack

- **Frontend:** Next.js, React, TypeScript, Tailwind CSS
- **Backend:** Express, Node.js, TypeScript, Prisma ORM
- **Database:** PostgreSQL (via Prisma)
- **Authentication:** JWT

## Project Structure

```
postbound/
├── client/          # Next.js frontend application
└── server/          # Express.js backend API
```

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```
3. Set up environment variables (see `.env.example`).
4. Run the development server:
   ```sh
   # Terminal 1 (Frontend)
   cd client && npm run dev
   # Terminal 2 (Backend)
   cd server && npm run dev
   ```

## Next Steps

- **Deployment:** Deploy to Vercel (frontend) and Render/Fly.io (backend).
- **Polish:** Implement pagination, confirmation dialogs, and accessibility improvements.
- **Testing:** Add unit and integration tests.
- **CI/CD:** Set up GitHub Actions for linting and tests.

## Contributing

Feel free to open issues or submit pull requests!

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.