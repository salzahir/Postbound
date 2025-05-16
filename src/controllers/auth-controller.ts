import * as userDb from "../db/user"
import { Request, Response } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

if (!JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined in environment variables");
}

function generateToken(userId: string): string {
    return jwt.sign({ id: userId }, JWT_SECRET, { expiresIn: '1h' });
}

async function handleGetUsers(req: Request, res: Response): Promise<void> {
    try {
        const users = await userDb.getUsers();
        res.status(200).json(users);
    } catch (error) {
        console.error("Error fetching users:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handlePostUser(req: Request, res: Response): Promise<void> {
    const { name, email, username, password } = req.body;
    try {
        const newUser = await userDb.postUser(name, email, username, password);
        res.status(201).json(newUser);
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handleGetLogin(req: Request, res: Response): Promise<void> {
    const { username, password } = req.body;
    try {
        const user = await userDb.getLogin(username, password);
        const token = generateToken(user.userid);
        const { password: _password, ...safeUser } = user;
        res.status(200).json({ token, user: safeUser });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export { handleGetUsers, handlePostUser, handleGetLogin };