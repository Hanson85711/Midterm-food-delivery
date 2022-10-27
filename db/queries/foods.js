const db = require('../connection');

const getFoods = () => {
  return db.query('SELECT * FROM foods;')
    .then(data => {
      return data.rows;
    });
};

const getUsername = () => {
  return db.query(`SELECT users.name FROM foods
  JOIN users ON user_id = users.id
  ;`)
    .then(data => {
      return data.rows;
    });
};



module.exports = { getFoods };
