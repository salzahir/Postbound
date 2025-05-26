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
    // userId: // de842ecc-30a2-4283-8efc-329f859231c4
}

async function seedDatabase() {
    try {
        console.log("Connected to the database");
        const user = await userDB.postUser(sampleData.name, sampleData.email, sampleData.username, sampleData.password, sampleData.isAuthor);
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