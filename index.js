const express = require('express');
const Database = require('better-sqlite3');

const app = express();
const PORT = 3000;

app.use(express.json());

// Connect to (or create) the database file
const db = new Database('todos.db');

// Create the todos table if it doesn't already exist
db.exec(`
  CREATE TABLE IF NOT EXISTS todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    task TEXT NOT NULL,
    done INTEGER DEFAULT 0
  )
`);

app.get('/', (req, res) => {
  res.send('Welcome to the Todo API!');
});

// GET all todos
app.get('/todos', (req, res) => {
  const todos = db.prepare('SELECT * FROM todos').all();
  res.json(todos);
});

// GET a single todo by id
app.get('/todos/:id', (req, res) => {
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });
  res.json(todo);
});

// POST a new todo
app.post('/todos', (req, res) => {
  const result = db.prepare('INSERT INTO todos (task) VALUES (?)').run(req.body.task);
  const newTodo = db.prepare('SELECT * FROM todos WHERE id = ?').get(result.lastInsertRowid);
  res.status(201).json(newTodo);
});

// PUT (update) a todo
app.put('/todos/:id', (req, res) => {
  const todo = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
  if (!todo) return res.status(404).json({ error: "Todo not found" });

  const task = req.body.task ?? todo.task;
  const done = req.body.done !== undefined ? (req.body.done ? 1 : 0) : todo.done;

  db.prepare('UPDATE todos SET task = ?, done = ? WHERE id = ?').run(task, done, req.params.id);
  const updated = db.prepare('SELECT * FROM todos WHERE id = ?').get(req.params.id);
  res.json(updated);
});

// DELETE a todo
app.delete('/todos/:id', (req, res) => {
  db.prepare('DELETE FROM todos WHERE id = ?').run(req.params.id);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});