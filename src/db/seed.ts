import { log } from "console";
import prisma from "../config/prisma";
import * as userDB from "./user";

// Sample data to seed the database
// Testing with Postman
const sampleData = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    username: "johndoe",
    password: "password123",
    isAuthor: true,
    // UserID: 39c3a375-d8da-4702-8814-31a9b15969ab
}

async function seedDatabase() {
    try {
        console.log("Connected to the database");
        const user = await userDB.postUser(sampleData.name, sampleData.email, sampleData.username, sampleData.password);
        console.log("User created:", user);
        console.log("User ID:", user.userid);
    } catch (error) {
        console.error("Error seeding database:", error);
    }
    finally {
        await prisma.$disconnect();
        console.log("Disconnected from the database");
    }
}

seedDatabase();
