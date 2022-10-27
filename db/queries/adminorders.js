const db = require('../connection');

//Generates number between 1 - 900
const generateOrderKey = function() {
  return Math.floor(Math.random() * (900 - 1 + 1) + 1);
}
// const placeOrder = (userid) => {
//   let randomKey = generateOrderKey();
//   return db.query(`UPDATE orders
//     SET submitted = true, order_number = ${randomKey}
//     WHERE submitted = false AND user_id = ${userid}
//     RETURNING *;`)
//     .then(data => {
//       return data.rows;
//      });
// };
const placeOrder = (userid) => {
  let randomKey = generateOrderKey();
  return db.query(`UPDATE orders
    SET submitted = true, order_number = ${randomKey}
    FROM orders o JOIN users u
    ON o.user_id = u.id
    WHERE orders.submitted = false AND orders.user_id = ${userid}
    RETURNING u.*,orders.*;`)
    .then(data => {
      console.log("data from place",data.rows)
      return data.rows;
    });
};

const completeOrder = (userid) => {
  return db.query(`UPDATE orders
  SET completed = true
  
  `)
}


const getSubmittedOrders = () => {
  return db.query(`SELECT foods.name as food, orders.user_id, count(orders.*), SUM(foods.price) as total_price, foods.id as foodId,
  foods.pic as pic, order_number
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE submitted = TRUE
  GROUP BY foods.name, orders.user_id, foods.pic, foods.id, order_number;`)
    .then(data => {
      return data.rows;
    });
};

const getSubmittedOrdersByUser = () => {
  return db.query(`SELECT orders.order_number, orders.user_id, SUM(foods.price) as total_price
  FROM orders
  JOIN foods ON foods.id = food_id
  WHERE submitted = TRUE
  GROUP BY orders.order_number, orders.user_id;`)
    .then(data => {
      return data.rows;
    });
};

module.exports = { placeOrder, getSubmittedOrders, getSubmittedOrdersByUser };

