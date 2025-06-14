import * as userDb from "../db/user"
import { NextFunction, Request, Response } from "express";
import { generateToken} from "../middleware/jwt";
import { devLog } from "../utils/devlog";


async function handleIsAuthor(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
        const userId = req.user?.id;
        const isAuthor = await userDb.isAuthor(userId);
        if (isAuthor) {
            next();
        } else {
            devLog("User is not an author");
            res.status(403).json({ message: "Forbidden" });
        }
    } catch (error) {
        console.error("Error checking author:", error);
        res.status(500).json({ message: "Internal server error" });
    }
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
        const existingUser = await userDb.getUserByEmail(email);
        if (existingUser) {
            res.status(400).json({ message: "Email already exists" });
            return;
        }
        const newUser = await userDb.postUser(name, email, username, password);
        const { password: _password, ...safeUser } = newUser;
        res.status(201).json(safeUser);
    } catch (error) {
        console.error("Error creating user:", error);
        if (error instanceof Error) {
            res.status(400).json({ message: error.message });
        } else {
            res.status(500).json({ message: "Internal server error" });
        }
    }
}

async function handleGetLogin(req: Request, res: Response): Promise<void> {
    try {
        const userId = req.user?.id;
        const user = await userDb.getUserById(userId);
        devLog("User logged in successfully: now", user);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error fetching user details:", error);
        res.status(500).json({ message: "Internal server error" });
    }
}

async function handlePostLogin(req: Request, res: Response): Promise<void> {
    try {
        const { username, password } = req.body;
        const user = await userDb.postLogin(username, password);
        const token = generateToken(user.userid);
        const { password: _password, ...safeUser } = user;
        devLog("User logged in successfully:", safeUser);
        res.status(200).json({ token, user: safeUser });
    } catch (error) {
        console.error("Error logging in:", error);
        res.status(401).json({ message: "Invalid credentials" });
    }
}

export { handleGetUsers, handlePostUser, handlePostLogin, handleIsAuthor, handleGetLogin };