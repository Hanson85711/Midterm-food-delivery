const db = require('../connection');

const getOrders = (userid) => {
  return db.query(`SELECT foods.name as food, orders.user_id, count(orders.*), SUM(foods.price) as total_price
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE orders.user_id = 2
  GROUP BY foods.name, orders.user_id;`)
    .then(data => {
      console.log(data.rows);
      return data.rows;
    });
};

module.exports = { getOrders };
