import { app } from '../../app';
import request from 'supertest';
import { expect } from '@jest/globals';
import dotenv from "dotenv";
dotenv.config({ path: ".env.test" });

async function getAuthToken() {
  const res = await request(app)
    .post("/auth/login")
    .send({ 
      username: process.env.TEST_USER, 
      password: process.env.TEST_PASS 
    });

  return res.body.token;
}

describe("Root endpoint", () => {
    it("returns welcome message with status 200", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: 'Welcome to the API' });
    })
})

describe("Post Endpoints", () => {
    let token: string;
    let postId: number;
    
    it("Posts get endpoint", async () => {
        const posts = await request(app).get("/posts")
        expect(posts.statusCode).toBe(200);
        expect(posts.headers['content-type']).toMatch(/application\/json/);
    })

    it("Posts post endpoint when authorized", async () => {
        token = await getAuthToken();
        const postRes = await request(app)
        .post("/posts")
        .set('Authorization', `Bearer ${token}`) 
        .send({
            title: "Testing a new Post",
            content: "This is the content of my tests",
            isPublic: true
        })
        
        expect(postRes.statusCode).toBe(201);
        expect(postRes.body).toHaveProperty("title");
        expect(postRes.body.content).toBe("This is the content of my tests");

        postId = postRes.body.id;
    })

    it("Update post endpoint when authorized", async () => {
        const updateRes = await request(app)
        .put(`/posts/${postId}`) 
        .set('Authorization', `Bearer ${token}`)
        .send({
            title: "Testing an updated post",
            content: "This is the content of my updated test post",
            isPublic: true
        })
        expect(updateRes.statusCode).toBe(200);
        expect(updateRes.body).toHaveProperty("title");
        expect(updateRes.body.content).toBe("This is the content of my updated test post");
    }) 

    it("Delete post endpoint when authorized", async () => {
        const removeRes = await request(app)
        .delete(`/posts/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        expect(removeRes.statusCode).toBe(200);
    })
})