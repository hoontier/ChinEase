// server.js
import express from 'express';
import mysql from 'mysql2/promise';
import cors from 'cors';
import config from './config';  // Import the configuration file

const app = express();
const PORT = 5000;

// Use the DB config from the config file
const dbConfig = config.db;
let connection;

async function initDbConnection() {
  try {
    connection = await mysql.createConnection(dbConfig);
    console.log('Connected to the MySQL server.');
  } catch (error) {
    console.error('Error connecting to the database:', error);
    process.exit(1);
  }
}

initDbConnection();

// Route to test the DB connection
app.get('/api/test-db', async (req, res) => {
  try {
    const [rows] = await connection.execute('SELECT 1 + 1 AS result');
    res.json({ message: `Database connection is successful! Result: ${rows[0].result}` });
  } catch (error) {
    res.status(500).json({ message: 'Database connection failed!', error: error.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
