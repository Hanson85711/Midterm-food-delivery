const { Pool } = require('pg');
const pool = new Pool({
  user: 'vagrant',
  password: '123',
  host: 'localhost',
  database: 'midterm'
});

//Adds Food to Order Database
const addOrder = function(property) {
  console.log(property);
  let params = [];
  for (const key in property) {
    params.push(property[key]);
  }
  return pool
  .query(`INSERT INTO orders(food_id, user_id) RETURNING *;`, params)
  .then((result) => {
    const output = result.rows[0];
    return output;
  })
  .catch((err) => {
    console.log("this is error", err);
  });
}
exports.addOrder = addOrder;
