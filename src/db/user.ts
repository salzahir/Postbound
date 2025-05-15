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

export { getUsers, postUser };