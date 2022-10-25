const db = require('../connection');

const getOrders = (userid) => {
  return db.query(`SELECT foods.name as food, orders.user_id, count(orders.*), SUM(foods.price) as total_price
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE orders.user_id = ${userid}
  GROUP BY foods.name, orders.user_id;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getOrders };
