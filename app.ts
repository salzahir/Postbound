import express from 'express';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import postRoutes from './src/routes/post-routes';
import authRoutes from './src/routes/auth-routes';

dotenv.config();
const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
    res.status(200).json({ message: "Welcome to the API" });
});

// Routes
app.use('/posts', postRoutes);
app.use("/auth", authRoutes);


export { app, PORT };