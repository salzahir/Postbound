# Postbound - Modern Blog Platform

A full-stack blog platform built with Next.js, Express, and MongoDB. Postbound allows users to create, share, and interact with blog posts in a modern, responsive environment.

![Postbound Logo](client/public/logo.png)

## ✨ Features

### Authentication & Security
- 🔐 JWT-based authentication
- 🔒 Protected routes and role-based access
- 🛡️ Secure password handling
- 🔑 Session management

### Blog Management
- ✍️ Rich text editor (TinyMCE)
- 📝 Full CRUD operations for posts
- 🌐 Public/private post visibility
- 🕒 Automatic timestamps
- 🔍 Search functionality

### Social Features
- 💬 Comment system with CRUD operations
- 👤 User profiles
- 🔔 Notifications (planned)
- 📱 Responsive design for all devices

### Technical Features
- ⚡ Server-side rendering with Next.js
- 🎨 Modern UI with Tailwind CSS
- 📊 MongoDB for flexible data storage
- 🔄 Real-time updates
- 🚀 Optimized performance

## 🛠️ Tech Stack

### Frontend
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- TinyMCE Editor

### Backend
- Node.js
- Express.js
- TypeScript
- MongoDB
- JWT Authentication

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- MongoDB
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/postbound.git
cd postbound
```

2. Install dependencies
```bash
# Install frontend dependencies
cd client
npm install

# Install backend dependencies
cd ../server
npm install
```

3. Set up environment variables
```bash
# In client directory
cp .env.example .env.local
# Add your environment variables

# In server directory
cp .env.example .env
# Add your environment variables
```

4. Start the development servers
```bash
# Start frontend (from client directory)
npm run dev

# Start backend (from server directory)
npm run dev
```

## 📁 Project Structure

```
postbound/
├── client/                 # Next.js frontend
│   ├── src/
│   │   ├── app/           # App router pages
│   │   ├── components/    # React components
│   │   └── types/        # TypeScript types
│   └── public/           # Static assets
└── server/               # Express backend
    ├── src/
    │   ├── controllers/  # Route controllers
    │   ├── models/      # Database models
    │   ├── routes/      # API routes
    │   └── middleware/  # Custom middleware
    └── tests/           # Backend tests
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/)
- [Express](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Tailwind CSS](https://tailwindcss.com/)
- [TinyMCE](https://www.tiny.cloud/)