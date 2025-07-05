import sqldb from 'better-sqlite3';

const db = sqldb('app.db');

db.pragma('journal_mode = WAL'); // Use Write-Ahead Logging for better concurrency

db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  email TEXT NOT NULL UNIQUE,
  password TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP);`
);

export default db;