# Postbound

A full-stack blog platform with public/private posts and comment functionality.

## Project Structure

```
postbound/
├── client/          # Next.js frontend application
└── server/          # Express.js backend API
```

## Getting Started

### Backend (Server)

The backend is a RESTful API built with Node.js, Express, TypeScript, and Prisma, using Supabase as the database.

See [server/README.md](server/README.md) for detailed backend documentation.

### Frontend (Client)

The frontend is a Next.js application that provides the user interface for the blog platform.

See [client/README.md](client/README.md) for detailed frontend documentation.

## Development

1. Clone the repository
   ```bash
   git clone https://github.com/salzahir/Postbound.git
   cd Postbound
   ```

2. Install dependencies
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Start development servers
   ```bash
   # Start backend server (from server directory)
   npm run dev

   # Start frontend server (from client directory)
   npm run dev
   ```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.