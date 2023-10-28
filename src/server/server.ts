//server.ts
import express from 'express';
import bodyParser from 'body-parser';
import mysql from 'mysql2/promise';
import cors from 'cors';

const app = express();
const port = 3001;

app.use(cors());
app.use(bodyParser.json());

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'chinese'
};

app.get('/', async (req, res) => {
  res.send('Chinese practice backend');
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
