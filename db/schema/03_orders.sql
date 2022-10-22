-- Drop and recreate Users table (Example)

DROP TABLE IF EXISTS users CASCADE;

CREATE TABLE orders (
  id SERIAL PRIMARY KEY NOT NULL,
  food_id INTEGER REFERENCES foods.id ON DELETE CASCADE,
  user_id INTEGER REFERENCES users.id ON DELETE CASCADE
);
