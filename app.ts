import express from 'express';

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.json({ message: "Welcome to the API" });
});

app.get("/posts", (req, res) => {
  res.json({ message: "Fetched all posts" });
});

app.post("/posts", (req, res) => {
  const { title, content } = req.body;
  res.json({ message: "Post created", data: { title, content } });
});

app.put("/posts/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Post ${id} updated` });
});

app.delete("/posts/:id", (req, res) => {
  const { id } = req.params;
  res.json({ message: `Post ${id} deleted` });
});

export { app, PORT };