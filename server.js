const express = require('express'); // You missed this line
const mysql = require('mysql');

const app = express();
app.use(express.json());

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

app.get('/todos', (req, res) => {
  db.query('SELECT * FROM todos', (err, results) => {
    if (err) {
      console.error('Query error:', err.message);
      return res.status(500).send('Database query failed');
    }
    res.json(results);
  });
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});


