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

let token: string;
let postId: number;
let commentId: number;

describe("Root endpoint", () => {
    it("returns welcome message with status 200", async () => {
        const res = await request(app).get("/");
        expect(res.statusCode).toBe(200)
        expect(res.body).toEqual({ message: 'Welcome to the API' });
    })
})

describe("Auth Endpoints", () => {
    it("Auth Login endpoint", async () => {
        const res = await request(app)
        .post("/auth/login")
        .send({
            username: process.env.TEST_USER,
            password: process.env.TEST_PASS
        });
        expect(res.statusCode).toBe(200);
        expect(res.body).toHaveProperty("token");
        expect(res.body).toHaveProperty("user");
        expect(res.body.user).toHaveProperty("userid");
        expect(res.body.user).toHaveProperty("name");
        expect(res.body.user).toHaveProperty("email");
        expect(res.body.user).toHaveProperty("username");
        expect(res.body.user).not.toHaveProperty("password");
        expect(res.body.token).toBeDefined();
        expect(res.headers['content-type']).toMatch(/application\/json/);
    })
})

describe("Post Endpoints", () => {
    
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
})

describe("Comment Endpoints", () => {
    it("Post a comment to a post", async () => {
    console.log("Posting comment to postId:", postId);
      const commentRes = await request(app)
        .post(`/comments/post/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: "Testing a new comment",
          content: "This is the content of my test comment",
        });
      expect(commentRes.statusCode).toBe(201);
      expect(commentRes.body).toHaveProperty("id");
      expect(commentRes.body).toHaveProperty("content", "This is the content of my test comment");
      commentId = commentRes.body.id;
    });

        it("Get Comments for a post", async () => {
      const commentsRes = await request(app).get(`/comments/post/${postId}`);
      expect(commentsRes.statusCode).toBe(200);
      expect(commentsRes.body).toBeInstanceOf(Array);
      expect(commentsRes.headers['content-type']).toMatch(/application\/json/);
      expect(commentsRes.body.length).toBeGreaterThanOrEqual(0);
      if (commentsRes.body.length > 0) {
        expect(commentsRes.body[0]).toHaveProperty("id");
        expect(commentsRes.body[0]).toHaveProperty("content");
        expect(commentsRes.body[0]).toHaveProperty("user");
      }
    })

    it("Updating a comment", async () => {
      const commentRes = await request(app)
        .post(`/comments/post/${postId}`)
        .set('Authorization', `Bearer ${token}`)
        .send({
          title: "Testing an updated comment",
          content: "This is the content of my updated comment",
        });
      commentId = commentRes.body.id;
      expect(commentId).toBeDefined();
      expect(commentRes.statusCode).toBe(201);
      expect(commentRes.body).toHaveProperty("id");
      expect(commentRes.body).toHaveProperty("content", "This is the content of my updated comment");
    });

    it("Delete a comment", async () => {
      if (!commentId) {
        throw new Error("commentId is undefined. Make sure the comment was created successfully.");
      }
      const deleteRes = await request(app)
        .delete(`/comments/${commentId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(deleteRes.statusCode).toBe(200);
    });

    it("Get a comment by ID", async () => {
      if (!commentId) {
        throw new Error("commentId is undefined. Make sure the comment was created successfully.");
      }
      const commentRes = await request(app)
        .get(`/comments/${commentId}`)
        .set('Authorization', `Bearer ${token}`);
      expect(commentRes.statusCode).toBe(404);
    });
  })

it("Delete post endpoint when authorized", async () => {
    const removeRes = await request(app)
    .delete(`/posts/${postId}`)
    .set('Authorization', `Bearer ${token}`)
    expect(removeRes.statusCode).toBe(200);
})
