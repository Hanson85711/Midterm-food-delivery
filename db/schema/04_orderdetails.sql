-- Drop and recreate Order Details table (Example)

DROP TABLE IF EXISTS orders CASCADE;

CREATE TABLE order_details (
  id SERIAL PRIMARY KEY NOT NULL,
  order_id INTEGER REFERENCES orders(id) ON DELETE CASCADE,
  food_id INTEGER REFERENCES foods(id) ON DELETE CASCADE,
  qty INT DEFAULT 0
);
