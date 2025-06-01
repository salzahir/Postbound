import express from 'express';
import { Request, Response } from 'express';
import postRoutes from './src/routes/post-routes';
import authRoutes from './src/routes/auth-routes';
import commentRoutes from './src/routes/comment-routes';
import dotenv from 'dotenv';
import cors from "cors";
import limiter from './src/middleware/rateLimiter';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:3000',
  credentials: true
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Apply rate limiting to all requests
app.use(limiter);

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the API" });
});

// Routes
app.use('/posts', postRoutes);
app.use("/auth", authRoutes);
app.use("/comments", commentRoutes);

export { app, PORT };