import sqlite3 from 'sqlite3'
import { open, Database } from 'sqlite'

export const getConnection = async (): Promise<Database> => {
  const db = await open({
    filename: './results.db',
    driver: sqlite3.Database
  });

  await db.exec(`
    CREATE TABLE IF NOT EXISTS results (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      winner TEXT NOT NULL CHECK(winner IN ('X','O','draw')),
      playedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
  `);

  return db;
};
