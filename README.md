# Postbound API

A RESTful API built with Node.js, Express, TypeScript, and Prisma, using Supabase as the database.

## Features

- User authentication (in progress)
- Post management
- RESTful API endpoints
- TypeScript implementation
- Prisma ORM with Supabase

## Tech Stack

- Node.js
- Express
- TypeScript
- Prisma
- Supabase
- JWT (for authentication)

## Project Structure

```
src/
├── controllers/     # Request handlers
├── routes/         # API routes
├── db/            # Database operations
│   ├── queries/   # Database queries
│   └── seed.ts    # Database seeding
└── utils/         # Utility functions
```

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up your environment variables
4. Run the development server:
   ```bash
   npm run dev
   ```

## API Endpoints

### Posts
- `GET /posts` - Get all posts
- `POST /posts` - Create a new post

### Users (In Progress)
- Authentication endpoints coming soon

## Development

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm start` - Start production server