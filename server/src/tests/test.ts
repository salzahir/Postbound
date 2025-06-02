import { app } from '../../app';
import request from 'supertest';
import { expect } from '@jest/globals';

describe("Root endpoint", () => {
    it("Root endpoint", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: 'Welcome to the API' });
    })
})

describe("Post Endpoints", () => {
    it("Posts endpoint", async () => {
        const posts = await request(app).get("/posts")
        expect(posts.statusCode).toBe(200);
        expect(posts.headers['content-type']).toMatch(/application\/json/);
    })

})