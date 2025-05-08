// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Connexion à la base de données RDS
const db = mysql.createConnection({
  host: 'todo-db.c78ay0i4m4da.eu-north-1.rds.amazonaws.com', // ← ton endpoint RDS
  user: 'admin',             // ← ton utilisateur RDS
  password: 'mytodo-app123',  // ← ton mot de passe
  database: 'todo_db',       // ← le nom de ta base
  port: 3306                 // ← port MySQL par défaut (facultatif mais recommandé)
});

db.connect(err => {
  if (err) {
    console.error('Erreur de connexion à MySQL :', err);
    return;
  }
  console.log('Connecté à la base de données MySQL');
});

// API simple
app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
});

const PORT = 4001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
