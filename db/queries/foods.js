const db = require('../connection');

const getFoods = () => {
  return db.query('SELECT * FROM foods;')
    .then(data => {
      return data.rows;
    });
};

module.exports = { getFoods };
