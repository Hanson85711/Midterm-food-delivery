const db = require('../connection');

const placeOrder = (userid) => {
  return db.query(`UPDATE orders
    SET submitted = true
    WHERE users.id = ${userid}
    RETURNING *;`)
    .then(data => {
      return data.rows;
    });
};

const getSubmittedOrders = () => {
  return db.query(`SELECT foods.name as food, orders.user_id, count(orders.*), SUM(foods.price) as total_price, foods.id as foodId,
  foods.pic as pic
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE submitted = TRUE
  GROUP BY foods.name, orders.user_id, foods.pic, foods.id;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { placeOrder, getSubmittedOrders };
