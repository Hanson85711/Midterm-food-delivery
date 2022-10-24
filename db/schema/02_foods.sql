-- Drop and recreate Foods table (Example)

DROP TABLE IF EXISTS foods CASCADE;

CREATE TABLE foods (
  id SERIAL PRIMARY KEY NOT NULL,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  name VARCHAR(255) NOT NULL,
  category VARCHAR(255) NOT NULL,
  pic VARCHAR(255) NOT NULL,
  description TEXT,
  price DECIMAL(4, 2) NOT NULL
);
