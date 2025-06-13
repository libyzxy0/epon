export const migrations = [
  {
    description: "Create coins table",
    sql: `
    CREATE TABLE IF NOT EXISTS coins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      amount INTEGER NOT NULL,
      currency TEXT NOT NULL,
      short_currency TEXT NOT NULL,
      started_at TEXT NOT NULL,
      last_update TEXT NOT NULL
    );
    `
  },
  {
    description: 'Create transactions table',
    sql: `
    CREATE TABLE IF NOT EXISTS transactions (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      transaction_type TEXT NOT NULL,
      amount INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    `
  }, {
    description: 'Create wishlist table',
    sql: `
    CREATE TABLE IF NOT EXISTS wishlist (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      description TEXT,
      is_bought BOOLEAN NOT NULL DEFAULT 0,
      price INTEGER NOT NULL,
      created_at TEXT NOT NULL
    );
    `
  }
]