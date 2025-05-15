import express from 'express';
import postRoutes from './src/routes/postroutes';
import { Request, Response } from 'express';

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

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

export { app, PORT };