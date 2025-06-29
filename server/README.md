# Postbound Server

A RESTful API backend for the Postbound blog platform.

## Features

- **Authentication:** Secure login, JWT storage, protected routes, and role-based access.
- **Posts:** Full CRUD, publish/unpublish, author-only controls, timestamps, and public/private logic.
- **Comments:** Full CRUD, user association, edit/delete for own comments, and proper linking to posts.
- **Database:** PostgreSQL with Prisma ORM for type-safe queries and migrations.
- **Testing:** Automated integration tests using Jest and Supertest for all major endpoints including login, post creation, update, and deletion.

## Tech Stack

- **Framework:** Express, Node.js, TypeScript
- **Database:** PostgreSQL (via Prisma ORM)
- **Authentication:** JWT
- **API:** RESTful endpoints

## Getting Started

1. Clone the repository.
2. Install dependencies:
   ```sh
   cd server && npm install
   ```
3. Set up environment variables (see `.env.example`).
4. Run the development server:
   ```sh
   npm run dev
   ```

## Next Steps

- **Deployment:** Deploy to Render/Fly.io.
- **Polish:** Implement rate limiting, CSRF protection, and logging.
- **CI/CD:** Set up GitHub Actions for linting and tests.

## Contributing

Feel free to open issues or submit pull requests!

## Project Structure

```
src/
├── config/         # Configuration files
├── controllers/    # Request handlers
├── db/            # Database operations
│   ├── queries/   # Database queries
│   └── seed.ts    # Database seeding
├── middleware/    # Custom middleware
│   ├── error.ts   # Error handling
│   └── jwt.ts     # JWT authentication
├── routes/        # API routes
└── utils/         # Utility functions
```

## API Endpoints

### Authentication
- `POST /auth/sign-up` - Register new user
- `POST /auth/login` - User login
- `GET /auth/users` - Get all users (protected)

### Posts
- `GET /posts` - Get all posts (public only for regular users)
- `POST /posts` - Create new post (author only)
- `PUT /posts/:id` - Update post (author only)
- `DELETE /posts/:id` - Delete post (author only)
- `PATCH /posts/:id/toggle` - Toggle post visibility (author only)

### Comments
- `GET /comments` - Get all comments
- `GET /comments/:id` - Get specific comment
- `POST /comments` - Create new comment (authenticated)
- `PUT /comments/:id` - Update comment (authenticated)
- `DELETE /comments/:id` - Delete comment (authenticated)

## Development

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

## Data Models

### User
- userid (UUID)
- username
- email
- password
- isAuthor (boolean)
- createdAt
- updatedAt

### Post
- id
- title
- content
- isPublic (boolean)
- userId
- createdAt
- updatedAt

### Comment
- id
- title
- content
- userId
- postId
- createdAt
- updatedAt

## Security Features

- JWT-based authentication
- Password hashing
- Protected routes
- Input validation
- Author-only access control
- Public/private post visibility

## Testing

This project includes a comprehensive set of integration tests using Jest and Supertest. These tests cover:

- Public and protected routes
- Authenticated user flows
- Post CRUD operations

To run tests:

```bash
npm test
```

## Future Improvements

- Add pagination for posts and comments
- Implement search functionality
- Add user profile management
- Add post categories/tags
- Implement rate limiting