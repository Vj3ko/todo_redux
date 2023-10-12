import cors from "cors";
import express from "express";
import Todo from "./models.js";
import { connectDB } from "./mongodb.js";

const app = express();
app.use(express.json());
app.use(cors());

await connectDB();

//get all todos
app.get("/todos", async (req, res) => {
  const todos = await Todo.find();
  return res.send(todos);
});

//add new todo
app.post("/todos", async (req, res) => {
  const { title, completed } = req.body;
  const newTodo = new Todo({
    id: Date.now(),
    title,
    completed,
  });

  await newTodo.save();
  return res.send(newTodo);
});

//update todo completion
app.patch("/todos/:id", async (req, res) => {
  const id = req.params.id;
  const { completed } = req.body;

  const todo = await Todo.findOne({ id });
  todo.completed = completed;
  await todo.save();

  return res.send(todo);
});

//update todo title
app.patch(`/todos/update/:id`, async (req, res) => {
  const id = req.params.id;
  const { title: newTitle } = req.body;

  const todo = await Todo.findOne({ id });
  todo.title = newTitle;
  await todo.save();

  return res.send(todo);
});

//delete todo
app.delete("/todos/:id", async (req, res) => {
  const id = req.params.id;

  await Todo.deleteOne({ id });
  return res.send(id);
});

const PORT = 5000;

app.listen(PORT, console.log(`Server running on port ${PORT}`));
