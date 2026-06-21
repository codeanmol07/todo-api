const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json()); // lets us read JSON sent in requests

// Temporary in-memory storage (resets every time server restarts)
let todos = [
  { id: 1, task: "Learn Express", done: false }
];

// GET all todos
app.get('/todos', (req, res) => {
  res.json(todos);
});

// GET a single todo by id
app.get('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const newTodo = {
    id: todos.length + 1,
    task: req.body.task,
    done: false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/todos/:id', (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  todo.task = req.body.task ?? todo.task;
  todo.done = req.body.done ?? todo.done;
  res.json(todo);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  todos = todos.filter(t => t.id !== parseInt(req.params.id));
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});