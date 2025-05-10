// server.js
const express = require('express');
const mysql = require('mysql2');

const app = express();
app.use(express.json());

// Connexion à la base de données RDS avec variables d'environnement
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_NAME,
  port: 3306
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

const PORT = process.env.PORT || 4001;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur http://localhost:${PORT}`);
});
