# Postbound API

A RESTful API built with Node.js, Express, TypeScript, and Prisma, using Supabase as the database. This API powers a blog platform with public/private posts and comment functionality.

## Features

- 🔐 **Authentication**
  - JWT-based authentication
  - Author and user roles
  - Protected routes
  - 7-day token expiration

- 📝 **Post Management**
  - Create, read, update, delete posts
  - Public/private post visibility
  - Author-only post management
  - Filtered views for regular users

- 💬 **Comment System**
  - Create, read, update, delete comments
  - User attribution
  - Protected comment management

- ✅ **Input Validation**
  - Form validation for users
  - Post content validation
  - Comment content validation
  - Detailed error messages

## Tech Stack

- **Backend**: Node.js, Express
- **Language**: TypeScript
- **Database**: PostgreSQL (via Supabase)
- **ORM**: Prisma
- **Authentication**: JWT
- **Validation**: Express Validator

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

## Getting Started

1. Clone the repository
   ```bash
   git clone https://github.com/salzahir/Postbound.git
   cd Postbound
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   Create a `.env` file with:
   ```
   DATABASE_URL="your-supabase-connection-string"
   JWT_SECRET="your-jwt-secret"
   PORT=3000
   ```

4. Run database migrations
   ```bash
   npx prisma migrate dev
   ```

5. Start the development server
   ```bash
   npm run dev
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

## Future Improvements

- Add pagination for posts and comments
- Implement search functionality
- Add user profile management
- Add post categories/tags
- Implement rate limiting