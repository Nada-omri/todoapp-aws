const express = require('express');
const mysql = require('mysql');
const path = require('path');

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public'))); // Serves HTML from public/

const db = mysql.createConnection({
  host: 'terraform-20250508213528251100000001.ctsoiw8yyjzh.eu-west-3.rds.amazonaws.com', // RDS endpoint
  user: 'admin',
  password: 'mypassword123',
  database: 'two_tier_db1'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL:', err.message);
    return;
  }
  console.log('Connected to MySQL database');
});

// Get all todos
app.get('/api/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).send('Database query failed: ' + err.message);
    }
    res.json(results);
  });
});

// Add a new todo
app.post('/api/todos', (req, res) => {
  const { task } = req.body;
  if (!task) return res.status(400).send('Task is required');
  db.query('INSERT INTO todos (task) VALUES (?)', [task], (err) => {
    if (err) {
      console.error('Insert error:', err.message);
      return res.status(500).send('Failed to add task: ' + err.message);
    }
    res.redirect('/');
  });
});

// Delete a todo
app.post('/api/todos/delete/:id', (req, res) => {
  const id = req.params.id;
  db.query('DELETE FROM todos WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Delete error:', err.message);
      return res.status(500).send('Failed to delete task: ' + err.message);
    }
    res.redirect('/');
  });
});

const PORT = process.env.PORT || 4001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});
