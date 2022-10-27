const db = require('../connection');

const getOrders = (userid) => {
  return db.query(`SELECT foods.name as food, orders.user_id, count(orders.*), SUM(foods.price) as total_price, foods.id as foodId,
  foods.pic as pic
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE orders.user_id = ${userid} AND submitted = FALSE
  GROUP BY foods.name, orders.user_id, foods.pic, foods.id;`)
    .then(data => {
      return data.rows;
    });
};

const getFinalTotal = (userid) => {
  return db.query(`SELECT SUM(total_price) as final_price
  FROM (SELECT SUM(foods.price) as total_price
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE orders.user_id = 2 AND submitted = FALSE
  GROUP BY foods.name, orders.user_id) foo;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { getOrders, getFinalTotal };
