import * as userDb from "../db/user"
import { Request, Response } from "express";

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
        res.status(200).json(user);
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export { handleGetUsers, handlePostUser, handleGetLogin };