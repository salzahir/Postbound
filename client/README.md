# Postbound Client

A Next.js frontend for the Postbound blog platform.

## Features

- **Authentication:** Secure login, JWT storage, protected routes, and role-based access.
- **Posts:** Full CRUD, publish/unpublish, author-only controls, timestamps, and public/private logic.
- **Comments:** Full CRUD, user association, edit/delete for own comments, and proper linking to posts.
- **UI/UX:** Clean, functional, and responsive with Tailwind CSS. Includes loading states, error handling, and confirmation dialogs (or plans for them).
- **Admin/Author Features:** Ability to manage posts and comments, not just consume content.

## Tech Stack

- **Framework:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **State Management:** React Context (planned)
- **API Calls:** Fetch/axios (planned refactor to service layer)

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   cd client && npm install
   ```
3. Set up environment variables (see `.env.example`).
4. Run the development server:
   ```sh
   npm run dev
   ```

## Next Steps

- **Deployment:** Deploy to Vercel.
- **Polish:** Implement pagination, confirmation dialogs, and accessibility improvements.
- **Testing:** Add unit and integration tests.
- **CI/CD:** Set up GitHub Actions for linting and tests.

## Contributing

Feel free to open issues or submit pull requests!
