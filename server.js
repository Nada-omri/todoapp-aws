const mysql = require('mysql');

const db = mysql.createConnection({

  host: 'terraform-20250508213528251100000001.ctsoiw8yyjzh.eu-west-3.rds.amazonaws.com', // Use RDS endpoint if using Amazon RDS

  user: 'admin',

  password: 'mypassword123',

  database: 'two_tier_db1'

});

db.connect((err) => {

  if (err) throw err;

  console.log('Connected to MySQL database');

});

app.get('/data', (req, res) => {

  db.query('SELECT * FROM your_table', (err, results) => {

    if (err) throw err;

    res.send(results);

  });

});
