import prisma from "../config/prisma";
import { hashPassword, comparePassword } from "../utils/hash";

async function getUsers() {
    try {
        const users = await prisma.user.findMany();
        return users;
    } catch (error) {
        console.error("Error fetching users:", error);
        throw new Error("Could not fetch users");
    }
}

async function postUser(name: string, email: string, username: string, password: string) {
    try {
        const hashedPassword = await hashPassword(password);
        const newUser = await prisma.user.create({
            data: {
                name,
                email,
                username,
                password: hashedPassword,
            },
        });
        return newUser;
    } catch (error) {
        console.error("Error creating user:", error);
        throw new Error("Could not create user");
    }
}

async function getLogin(username: string, password: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { username },
        });
        if (!user) {
            throw new Error("User not found");
        }
        const isMatch = await comparePassword(password, user.password);

        if (!isMatch) {
            throw new Error("Invalid password");
        }
        return user;
    } catch (error) {
        console.error("Error logging in:", error);
        throw new Error("Could not log in");
    }
}

async function isAuthor(userid: string) {
    try {
        const user = await prisma.user.findUnique({
            where: { userid },
        });
        if (!user) {
            throw new Error("User not found");
        }
        return user.isAuthor;
    } catch (error) {
        console.error("Error checking author:", error);
        throw new Error("Could not check author");
    }
}

export { getUsers, postUser, getLogin, isAuthor };